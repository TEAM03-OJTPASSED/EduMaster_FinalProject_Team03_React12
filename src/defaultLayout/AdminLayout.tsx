import { Outlet } from "react-router-dom"; // Import Outlet
import AdminNavBar from "../components/AdminNavbar"; // Đường dẫn tới component AdminNavBar
import { Layout } from "antd"; // Import Layout từ Ant Design

const { Content } = Layout; // Destructure Content từ Layout

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminNavBar /> {/* Navbar */}
      <Layout style={{ marginTop: "80px" }}>
        <Content style={{ padding: "24px" }}>
          <Outlet /> {/* Render component từ route */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
