import { Outlet } from "react-router-dom"; // Import Outlet
import AdminNavBar from "../components/AdminNavbar"; // Đường dẫn tới component AdminNavBar
import { Layout } from "antd"; // Import Layout từ Ant Design
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";

const { Content } = Layout; // Destructure Content từ Layout

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminNavBar /> {/* Navbar */}
      <Layout style={{ padding: "24px", marginTop: "80px" }}>
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
