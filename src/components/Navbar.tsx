import { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Input, InputRef, MenuProps, Space, Drawer } from "antd"; // Import Drawer
import { DownOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
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
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Add state to track user login status
  const searchInputRef = useRef<InputRef>(null);

  const location = useLocation();
  const storedUser = localStorage.getItem("User"); 

  useEffect(() => {
    // Check for user data in local storage
    if (storedUser) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [storedUser]);

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

  const profileMenu: MenuProps = {
    items: [
      { label: "Profile", key: "profile" },
      { label: "Settings", key: "settings" },
      { label: "My Dashboard", key: "dashboard", onClick: () => { 
          navigate(`/dashboard/${JSON.parse(storedUser ?? "").role}`);
        },
      },
      { label: "Logout", key: "logout", onClick: () => { 
          localStorage.removeItem("User");
          setUserLoggedIn(false);
          navigate("/login");
        },
      },
    ],
  };

  return (
    <div className="w-full h-20 flex items-center justify-between p-4 pb-0 z-50 bg-white shadow-md relative">
      {!isSearchActive ? (
        <>
          <img
            className="w-36 lg:w-56 cursor-pointer"
            src={logoImage}
            alt="EduMaster logo"
            onClick={() => navigate("/")}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
          <div className="hidden md:flex">
            <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveButton("home");
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "courses" ? "active" : ""}`}
              onClick={() => {
                setActiveButton("courses");
                navigate("/course");
              }}
            >
              Courses
            </Button>
            <Button
              className={`navbar-button px-3 lg:px-6 ${activeButton === "blog" ? "active" : ""}`}
              onClick={() => {
                setActiveButton("blog");
                navigate("/blog");
              }}
            >
              Blog
            </Button>
            <Dropdown menu={menuProps}>
              <Button className={`navbar-button ${activeButton === "pages" ? "active" : ""}`}>
                <Space>
                  Pages
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>



          {/* Log In / Sign Up and Search Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-0 w-10 h-10 text-2xl relative" onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined />
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs text-white font-semibold">2</span>
            </button>
            {userLoggedIn ? (
              <Dropdown menu={profileMenu}>
                <div className="w-10 h-10 text-xl rounded-full flex items-center justify-center cursor-pointer">
                  <UserOutlined/>
                </div>
              </Dropdown>
            ) : (
              <>
                <div className="border-[1.5px] border-black rounded-3xl">
                  <div className="pt-1.5 pb-2 pl-3 pr-3">
                    <a className="text-base font-medium cursor-pointer" onClick={() => navigate("/login")}>Login</a>
                  </div>
                </div>
                <div className="border-[1.5px] border-black rounded-3xl">
                  <div className="pt-1.5 pb-2 pl-3 pr-3">
                    <a className="text-base font-medium cursor-pointer" onClick={() => navigate("/signup")}>Sign up</a>
                  </div>
                </div>
              </>
            )}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" onClick={() => setIsSearchActive(true)}>
              <AiOutlineSearch size={24} />
            </div>
          </div>

          {/* Burger Menu for mobile */}
          <div className="md:hidden flex items-center">
            <button className="p-0 w-10 h-10 text-2xl relative mr-8" onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined />
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-xs text-white font-semibold">2</span>
            </button>
            <MenuOutlined className="text-xl cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          </div>

          {/* Drawer for mobile menu */}
          <Drawer title="EduMaster" placement="right" onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen}>
            <div className="flex flex-col">
              <Button
                className={`navbar-button ${activeButton === "home" ? "active" : ""}`}
                onClick={() => {
                  setActiveButton("home");
                  navigate("/");
                  setIsDrawerOpen(false);
                }}
              >
                Home
              </Button>
              <Button
                className={`navbar-button ${activeButton === "courses" ? "active" : ""}`}
                onClick={() => {
                  setActiveButton("courses");
                  navigate("/course");
                  setIsDrawerOpen(false);
                }}
              >
                Courses
              </Button>
              <Button
                className={`navbar-button ${activeButton === "blog" ? "active" : ""}`}
                onClick={() => {
                  setActiveButton("blog");
                  navigate("/blog");
                  setIsDrawerOpen(false);
                }}
              >
                Blog
              </Button>
              <Dropdown menu={menuProps}>
                <Button className={`navbar-button ${activeButton === "pages" ? "active" : ""}`}>
                  <Space>
                    Pages
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              {/* Log In and Sign Up */}
              {!userLoggedIn ? (
                <>
                  <Button className="mt-4 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost" onClick={() => { navigate("/login"); setIsDrawerOpen(false); }}>Log In</Button>
                  <Button className="mt-2 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost" onClick={() => { navigate("/signup"); setIsDrawerOpen(false); }}>Sign Up</Button>
                </>
              ) : (
                <Button className="mt-4 h-12 w-full text-lg py-4 view-button ant-btn-variant-solid font-jost" onClick={() => { localStorage.removeItem("userToken"); setUserLoggedIn(false); setIsDrawerOpen(false); navigate("/login"); }}>Log Out</Button>
              )}
            </div>
          </Drawer>
        </>
      ) : (
        <Input
          placeholder="Search..."
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
