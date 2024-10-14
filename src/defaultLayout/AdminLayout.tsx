import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import AdminNavBar from "../components/Admin/AdminNavbar";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra kích thước màn hình
    };

    handleResize(); // Kiểm tra khi render lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* {Navbar} */}
      <AdminNavBar />
      <Layout
        style={{
          marginLeft: isMobile ? 0 : 250, // MarginLeft cho desktop
          padding: "24px 24px 0 24px",
          marginTop: "80px",
        }}
      >
        <DynamicBreadcrumb />
        <Content
          style={{
            borderRadius: "15px",
            padding: "8px",
            backgroundColor: "#fff",
            minHeight: "80vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
