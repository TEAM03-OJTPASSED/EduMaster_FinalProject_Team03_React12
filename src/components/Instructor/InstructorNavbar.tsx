import { useState, useEffect } from "react";
import { Layout, Button, Drawer, Avatar, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logoImage from "../../assets/EduMaster.png"; // Đường dẫn đến logo
import { useCustomNavigate } from "../../hooks/customNavigate"; // Hook tùy chỉnh cho điều hướng
import InstructorSidebar from "./InstructorSidebar";

const { Sider } = Layout; // Chỉ destructure Sider

const InstructorNavbar = () => {
  const navigate = useCustomNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra kích thước màn hình
    };

    handleResize(); // Kiểm tra khi render lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible); // Toggle Drawer khi click
  };

  // Update the menu items to use items prop
  const menuItems = [
    {
      key: "profile",
      label: <span onClick={() => navigate("/profile")}>Profile</span>,
    },
    {
      key: "settings",
      label: <span onClick={() => navigate("/settings")}>Settings</span>,
    },
    {
      key: "logout",
      label: <span onClick={() => navigate("/logout")}>Logout</span>,
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div
        className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md"
        style={{
          position: "fixed", // Đặt navbar ở vị trí fixed
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            className="text-base"
          />
        )}

        <Drawer
          width={250}
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          visible={drawerVisible} // Control visibility
        >
          {/* Sử dụng AdminSiderMenu bên trong Drawer */}
          <InstructorSidebar onMenuClick={toggleDrawer} />
        </Drawer>

        {/* Logo ở Navbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logoImage}
            alt="EduMaster logo"
            style={{
              height: isMobile ? "30px" : "40px", // Điều chỉnh kích thước logo
              marginRight: "16px", // Khoảng cách giữa logo và các thành phần khác
            }}
          />
        </div>

        {/* Avatar cho Navbar */}
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px",
              marginLeft: "16px",
              color: "white",
              borderRadius: "10px",
              backgroundColor: "transparent",
              transition:
                "background-color 0.3s, opacity 0.3s, transform 0.3s, box-shadow 0.3s", // Added transform and box-shadow
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added shadow for depth
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; // Subtle background color change on hover
              e.currentTarget.style.opacity = "1"; // Ensure full opacity on hover
              e.currentTarget.style.transform = "scale(1.05)"; // Slightly scale up on hover
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)"; // Enhance shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"; // Reset background color
              e.currentTarget.style.opacity = "0.9"; // Reset opacity
              e.currentTarget.style.transform = "scale(1)"; // Reset scale
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Reset shadow
            }}
          >
            <Avatar
              shape="square"
              size="large"
              src="https://picsum.photos/id/237/200/300"
              alt="User Avatar"
              style={{ border: "2px solid white" }} // Added border for contrast
            />
            {!isMobile && (
              <span
                style={{
                  marginLeft: "10px",
                  color: "#000",
                  transition: "color 0.3s",
                }}
              >
                Admin
              </span>
            )}
          </div>
        </Dropdown>
      </div>

      {/* Sidebar cho desktop */}
      {!isMobile && (
        <Sider
          theme="light"
          width={250} // Chiều rộng cố định
          style={{
            position: "fixed", // Cố định sidebar
            height: "100vh", // Chiều cao bao phủ toàn trang
            top: "80px", // Khoảng cách từ đầu trang, để tránh bị navbar đè lên
            left: 0, // Canh lề trái
            zIndex: 999, // Đảm bảo z-index để không bị các phần tử khác đè lên
            backgroundColor: "#fff", // Đặt màu nền cho sidebar
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Thêm chút shadow cho đẹp
          }}
        >
          <InstructorSidebar /> {/* Thêm AdminSiderMenu */}
        </Sider>
      )}
    </>
  );
};

export default InstructorNavbar;
