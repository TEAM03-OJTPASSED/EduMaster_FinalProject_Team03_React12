import { useState } from "react";
import { Button, Dropdown, Input, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import logoImage from "../assets/EduMaster.png";
import { useCustomNavigate } from "../hooks/customNavigate";
import { AiOutlineSearch } from "react-icons/ai";

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

  return (
    <div className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md relative z-50">
      {!isSearchActive ? (
        <>
          <img
            src={logoImage}
            alt="EduMaster logo"
            onClick={() => navigate("/")}
            style={{ objectFit: "cover", width: "250px", cursor: "pointer" }}
          />
          <div>
            <Button
              className={`navbar-button ${
                activeButton === "home" ? "active" : ""
              }`}
              onClick={() => {
                setActiveButton("home");
                navigate("/");
              }}
            >
              Home
            </Button>
          </div>
          <div>
            <Button
              className={`navbar-button ${
                activeButton === "courses" ? "active" : ""
              }`}
              onClick={() => {
                setActiveButton("courses");
                navigate("/course");
              }}
            >
              Courses
            </Button>
          </div>
          <div>
            <Button
              className={`navbar-button ${
                activeButton === "blog" ? "active" : ""
              }`}
              onClick={() => {
                setActiveButton("blog");
                navigate("/blog");
              }}
            >
              Blog
            </Button>
          </div>
          <div>
            <Dropdown menu={menuProps} className="dropdown-menu-button">
              <Button color="default" variant="text">
                <Space>
                  Pages
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className="flex items-center gap-4">
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
            <div
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            >
              <AiOutlineSearch size={24} />
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
      )}
    </div>
  );
};

export default Navbar;
