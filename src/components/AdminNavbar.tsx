// AdminNavBar.tsx
import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logoImage from "../assets/EduMaster.png"; // Đường dẫn đến logo
import { useCustomNavigate } from "../hooks/customNavigate"; // Hook tùy chỉnh cho điều hướng
import AdminSiderMenu from "./AdminSiderMenu";
import AdminContent from "../pages/AdminDashboard/AdminContent";

const { Sider } = Layout;

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
    <Layout>
      {/* Sidebar cho desktop */}
      {!isMobile && (
        <Sider
          theme="light"
          width={200} // Chiều rộng cố định
          style={{ minHeight: "100vh" }}
        >
          <div
            style={{
              color: "black",
              padding: "16px",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            <img
              src={logoImage}
              alt="EduMaster logo"
              style={{ width: "100%", marginBottom: "8px", marginTop: "8px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          <AdminSiderMenu  />{" "}
          {/* Thêm AdminSiderMenu */}
        </Sider>
      )}

      <Layout>
        {/* Navbar */}
        <div className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md relative z-50">
          {isMobile && (
            <>
              <Button
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                className="text-base"
              />
              <div
                style={{
                  color: "black",
                  padding: "16px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                <img
                  src={logoImage}
                  alt="EduMaster logo"
                  style={{
                    width: "100%",
                    marginBottom: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                />
              </div>
            </>
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

        {/* Nội dung chính */}
        <Layout.Content style={{ padding: "24px", minHeight: "100vh" }}>
          <AdminContent />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminNavBar;
