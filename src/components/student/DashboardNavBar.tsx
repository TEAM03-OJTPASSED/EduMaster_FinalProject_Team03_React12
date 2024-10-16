import React, { useState, useEffect } from "react";
import { Button, Drawer, Avatar, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logoImage from "../../assets/EduMaster.png";
import { useCustomNavigate } from "../../hooks/customNavigate";
import DashboardSideBar from "./DashboardSideBar";


interface DashboardNavBarProps {
    role: string;
  }
  
  const DashboardNavBar: React.FC<DashboardNavBarProps> = ({role}) => {
  const navigate = useCustomNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const [isHovered, setIsHovered] = useState(false); // Thêm state cho hover

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => navigate("/logout")}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md"
        style={{
          position: "fixed",
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
          open={drawerVisible}
          styles={{ body: { padding: 0 } }} // Sử dụng styles.body thay cho bodyStyle
        >
          <DashboardSideBar role={role} onMenuClick={toggleDrawer} />
        </Drawer>

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
              height: isMobile ? "30px" : "40px",
              marginRight: "16px",
            }}
          />
        </div>

        <Dropdown overlay={menu} trigger={["click"]}>
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
                "background-color 0.3s, opacity 0.3s, transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transform: isHovered ? "scale(1.05)" : "scale(1)", // Điều chỉnh scale khi hover
            }}
            onMouseEnter={() => setIsHovered(true)} // Bắt đầu hover
            onMouseLeave={() => setIsHovered(false)} // Kết thúc hover
          >
            <Avatar
              shape="square"
              size="large"
              src="https://picsum.photos/id/237/200/300"
              alt="User Avatar"
              style={{ border: "2px solid white" }}
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
      <DashboardSideBar role={role} />
    </>
  );
};

export default DashboardNavBar;
