import React, { ReactNode } from "react"; // Import ReactNode từ React
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";

const { Content } = Layout;

// Định nghĩa kiểu cho props
interface DashboardLayoutProps {
  Navbar: ReactNode; // Đặt kiểu cho Navbar
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ Navbar }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {Navbar}
      <Layout
        style={{
          marginLeft: 250,
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

export default DashboardLayout;
