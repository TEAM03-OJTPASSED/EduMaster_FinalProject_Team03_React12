import { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Input, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import logoImage from "../assets/EduMaster.png";
import { useCustomNavigate } from "../hooks/customNavigate";

// Define the type for menu items
interface MenuItem {
  label: string;
  key: string;
  path: string;
}

// Define the items with paths
const items: MenuItem[] = [
  {
    label: "Contact",
    key: "1",
    path: "/contact",
  },
  {
    label: "FAQs",
    key: "2",
    path: "/faqs",
  },
  {
    label: "Error",
    key: "3",
    path: "/error",
  },
];

const Navbar = () => {
  const navigate = useCustomNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const menuRef = useRef<HTMLDivElement>(null); // Ref to track menu

  // Updated handleMenuClick to navigate to the selected item's path
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path); // Navigate to the selected item's path
    }
  };

  const menuProps = {
    items: items.map((item) => ({ label: item.label, key: item.key })), // Map to the expected structure
    onClick: handleMenuClick,
  };

  // Effect to close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu if click is outside
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md relative z-50">
      {!isSearchActive ? (
        <>
          <img
            className="w-24 sm:w-36 cursor-pointer"
            src={logoImage}
            alt="EduMaster logo"
            onClick={() => navigate("/")}
            style={{ objectFit: "cover", width: "250px", cursor: "pointer" }}
          />

          {/* Mobile Menu Icon */}
          <div className="flex sm:hidden items-center">
            <AiOutlineMenu
              size={24}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden sm:flex items-center space-x-4">
            <Button
              className={`navbar-button ${
                activeButton === "home" ? "active" : ""
              } text-[16px]`}
              onClick={() => {
                setActiveButton("home");
                navigate("/");
              }}
            >
              Home
            </Button>

            <Button
              className={`navbar-button ${
                activeButton === "courses" ? "active" : ""
              } text-[16px]`}
              onClick={() => {
                setActiveButton("courses");
                navigate("/course");
              }}
            >
              Courses
            </Button>

            <Button
              className={`navbar-button ${
                activeButton === "blog" ? "active" : ""
              } text-[16px]`}
              onClick={() => {
                setActiveButton("blog");
                navigate("/blog");
              }}
            >
              Blog
            </Button>

            <Dropdown
              menu={menuProps}
              className="dropdown-menu-button text-[16px]"
            >
              <Button color="default" variant="text">
                <Space>
                  Pages
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          {/* Log In, Sign Up, and Search buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            <button
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600 text-[16px]"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600 text-[16px]"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <div
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            >
              <AiOutlineSearch className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </div>
        </>
      ) : (
        <Input
          placeholder="Search..."
          className="transition-all duration-3000 ease-in-out"
          style={{
            width: "90%",
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
            borderRadius: "20px",
            padding: "10px",
            height: "50px",
          }}
          autoFocus
          onBlur={() => setIsSearchActive(false)}
        />
      </div>
      <div
        className={`flex m-2 gap-2 md:gap-3 items-center transition-opacity duration-200 ${
          searchExpanded ? "opacity-0" : "opacity-100"
        }`}
      >
        {" "}
        {/* Ẩn các nút khi ô tìm kiếm mở */}
        <button
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600 text-sm md:text-base"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="px-3 py-1.5 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600 text-sm md:text-base"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Media query: áp dụng chỉ cho màn hình nhỏ */}
      )}

      {/* Mobile Menu (visible when icon is clicked) */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-20 right-0 bg-white w-48 h-screen flex flex-col items-center shadow-lg sm:hidden"
        >
          <Button
            className={`navbar-button ${
              activeButton === "home" ? "active" : ""
            } text-[16px] w-full text-center py-2`}
            onClick={() => {
              setActiveButton("home");
              setIsMenuOpen(false);
              navigate("/");
            }}
          >
            Home
          </Button>

          <Button
            className={`navbar-button ${
              activeButton === "courses" ? "active" : ""
            } text-[16px] w-full text-center py-2`}
            onClick={() => {
              setActiveButton("courses");
              setIsMenuOpen(false);
              navigate("/course");
            }}
          >
            Courses
          </Button>

          <Button
            className={`navbar-button ${
              activeButton === "blog" ? "active" : ""
            } text-[16px] w-full text-center py-2`}
            onClick={() => {
              setActiveButton("blog");
              setIsMenuOpen(false);
              navigate("/blog");
            }}
          >
            Blog
          </Button>

          <Dropdown menu={menuProps} className="w-full">
            <Button
              color="default"
              variant="text"
              className="text-[16px] w-full text-center py-2"
            >
              <Space>
                Pages
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <button
            className="px-2 py-1 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600 text-[16px] w-full text-center mt-2"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/login");
            }}
          >
            Log In
          </button>
          <button
            className="px-2 py-1 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600 text-[16px] w-full text-center mt-2"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
