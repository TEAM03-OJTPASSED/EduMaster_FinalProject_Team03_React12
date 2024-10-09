import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import Outlet và useLocation
import AdminNavBar from "../components/Admin/AdminNavbar"; // Đường dẫn tới component AdminNavBar
import { Layout } from "antd"; // Import Layout từ Ant Design
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay"; // Import overlay loading

const { Content } = Layout; // Destructure Content từ Layout

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true); // Bật loading khi có thay đổi route
    const timer = setTimeout(() => {
      setIsLoading(false); // Tắt loading sau 1 giây
    }, 1000);

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Hiển thị loading overlay */}
      {/* {isLoading && <LoadingOverlay />}  */}
      <AdminNavBar /> {/* Navbar */}
      <Layout style={{ padding: "24px 24px 0 24px", marginTop: "80px" }}>
        <DynamicBreadcrumb /> {/* Breadcrumb */}
        <Content
          style={{
            borderRadius: "15px",
            padding: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Outlet /> {/* Render component từ route */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
