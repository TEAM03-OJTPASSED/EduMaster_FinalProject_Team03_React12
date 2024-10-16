import { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Input, InputRef, MenuProps, Space, Drawer } from "antd"; // Import Drawer
import { DownOutlined, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logoImage from "../assets/EduMaster.png";
import { useCustomNavigate } from "../hooks/customNavigate";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";

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
  const [activeButton, setActiveButton] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const searchInputRef = useRef<InputRef>(null);

  const location = useLocation();

  useEffect(() => {
    const pathToButtonKeyMap: { [key: string]: string } = {
      "/": "home",
      "/course": "courses",
      "/blog": "blog",
      "/contact": "pages",
      "/faqs": "pages",
      "/error": "pages",
    };

    const selectedKey = pathToButtonKeyMap[location.pathname];
    if (selectedKey) {
      setActiveButton(selectedKey);
    }
  }, [location.pathname]);

  


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.input?.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  // Handle menu item clicks
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setActiveButton("pages");
      navigate(selectedItem.path);
      setIsDrawerOpen(false); // Close drawer on menu item click
    }
  };

  const menuProps = {
    items: items.map((item) => ({ label: item.label, key: item.key })),
    onClick: handleMenuClick,
  };

  return (
    <div className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md relative z-0">
      {!isSearchActive ? (
        <>
          <img
            className="w-24 sm:w-36 cursor-pointer"
            src={logoImage}
            alt="EduMaster logo"
            onClick={() => navigate("/")}
            style={{ objectFit: "cover", width: "250px", cursor: "pointer" }}
          />
          <div className="hidden md:flex"> {/* Hide on smaller screens */}
            <Button
              className={`navbar-button ${activeButton === "home" ? "active" : ""} text-xs sm:text-base`}
              onClick={() => {
                setActiveButton("home");
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              className={`navbar-button ${activeButton === "courses" ? "active" : ""} text-xs sm:text-base`}
              onClick={() => {
                setActiveButton("courses");
                navigate("/course");
              }}
            >
              Courses
            </Button>
            <Button
              className={`navbar-button ${activeButton === "blog" ? "active" : ""} text-xs sm:text-base`}
              onClick={() => {
                setActiveButton("blog");
                navigate("/blog");
              }}
            >
              Blog
            </Button>
            <Dropdown menu={menuProps}>
              <Button className={`navbar-button ${activeButton === "pages" ? "active" : ""} text-xs sm:text-base`}>
                <Space className="text-base font-semibold">
                  Pages
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          {/* Log In / Sign Up and Search Icons */}
          <div className="hidden md:flex items-center gap-4"> {/* Hide on smaller screens */}
          <button
                className="p-0 w-10 h-10 text-2xl mr-6 relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartOutlined  width={32} height={32} color="black"/>
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs text-white font-semibold">
                  2
                </span>

            </button>
            
            <div className="border-2 border-black rounded-3xl">
              <div className="pt-1.5 pb-2 pl-3 pr-3">
                <a className="text-sm text-bold navbar-button cursor-pointer" onClick={() => navigate("/login")}>Login</a>
              </div>
            </div>
            {/* <button
              className="px-3 py-1.5 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600 text-sm md:text-base"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button> */}
            <div className="border-2 border-black rounded-3xl">
              <div className="pt-1.5 pb-2 pl-3 pr-3">
                <a className="text-sm text-bold navbar-button cursor-pointer" onClick={() => navigate("/signup")}>Sign up</a>
              </div>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            >
              <AiOutlineSearch size={24} />
            </div>
          </div>

          {/* Burger Menu for mobile */}
          <div className="md:hidden"> {/* Show on smaller screens */}
            <MenuOutlined
              className="text-xl cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
            />
          </div>

          {/* Drawer for mobile menu */}
          <Drawer
            title="EduMaster"
            placement="right"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            className="flex flex-col "
          >
            <div className="flex flex-col justify-center items-center">
              <Button
                className={`navbar-button ${activeButton === "home" ? "active" : ""} text-sm w-full`}
                onClick={() => {
                  setActiveButton("home");
                  navigate("/");
                  setIsDrawerOpen(false); // Close drawer
                }}
              >
                Home
              </Button>
              <Button
                className={`navbar-button ${activeButton === "courses" ? "active" : ""} text-sm w-full`}
                onClick={() => {
                  setActiveButton("courses");
                  navigate("/course");
                  setIsDrawerOpen(false); // Close drawer
                }}
              >
                Courses
              </Button>
              <Button
                className={`navbar-button ${activeButton === "blog" ? "active" : ""} text-sm w-full`}
                onClick={() => {
                  setActiveButton("blog");
                  navigate("/blog");
                  setIsDrawerOpen(false); // Close drawer
                }}
              >
                Blog
              </Button>
              <Dropdown menu={menuProps}>
                <Button className={`navbar-button ${activeButton === "pages" ? "active" : ""} text-sm w-full`}>
                  <Space className="text-base font-semibold">
                    Pages
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </Drawer>
        </>
      ) : (
        <Input
          placeholder="Search..."
          className="transition-all duration-300 ease-in-out"
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
          ref={searchInputRef}
        />
      )}
    </div>
  );
};

export default Navbar;
