import React from "react";
import { Layout } from "antd";
import MessageSidebar from "./MessageSideBar";
import MessageNavbar from "./MessageNavbar";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const MessageLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <MessageNavbar />
      <Layout style={{ marginTop: "80px" }}>
        {/* Sidebar */}
        <Sider
          width={300}
          style={{
            backgroundColor: "#fff",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
            borderRight: "1px solid #f0f0f0",
            padding: "16px 0",
          }}
        >
          <MessageSidebar />
        </Sider>
        {/* Main Content */}
        <Content
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            marginLeft: "16px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MessageLayout;
