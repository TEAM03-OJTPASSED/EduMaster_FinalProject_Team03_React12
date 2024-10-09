import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logoImage from "../assets/EduMaster.png"; // Đường dẫn đến logo
import { useCustomNavigate } from "../hooks/customNavigate"; // Hook tùy chỉnh cho điều hướng
import AdminSiderMenu from "./AdminSiderMenu";

const { Sider } = Layout; // Chỉ destructure Sider

const AdminNavBar = () => {
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
              height: "40px", // Điều chỉnh kích thước logo
              marginRight: "16px", // Khoảng cách giữa logo và các thành phần khác
            }}
          />
        </div>

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
          <AdminSiderMenu onMenuClick={toggleDrawer} />
        </Drawer>
      </div>

      {/* Sidebar cho desktop */}
      {!isMobile && (
        <Sider
          theme="light"
          width={200} // Chiều rộng cố định
          style={{ minHeight: "100vh", marginTop: "80px" }} // Bổ sung marginTop để tránh chồng lên navbar
        >
          <AdminSiderMenu /> {/* Thêm AdminSiderMenu */}
        </Sider>
      )}
    </>
  );
};

export default AdminNavBar;
