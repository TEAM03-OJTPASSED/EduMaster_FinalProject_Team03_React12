import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";

import {
  DashboardOutlined,
  UserOutlined,
  FolderOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { GoListOrdered } from "react-icons/go";

const { Sider } = Layout;

interface SideBarProps {
  role: string;
  onMenuClick?: () => void;
}

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  title: string;
  path?: string;
  children?: MenuItem[];
}

const StudentMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    path: "/dashboard/student",
  },
  {
    key: "courses",
    icon: <FolderOutlined />,
    title: "My Learning",
    path: "/dashboard/student/my-courses",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    title: "Profile",
    path: "/dashboard/student/profile",
  },
  {
    key: "orders",
    icon: <GoListOrdered />,
    title: "Orders",
    path: "/dashboard/student/orders",
  }, 
  {
    key: "subscriptions",
    icon: <StarOutlined />,
    title: "Subscriptions",
    path: "/dashboard/student/subscriptions",
  },
];

const DashboardSideBar: React.FC<SideBarProps> = ({ onMenuClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useCustomNavigate();

  const menuItems = StudentMenuItems;

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick();

    const selectedItem = menuItems.find(
      (item) =>
        item.key === key || item.children?.some((child) => child.key === key)
    );
    if (selectedItem) {
      const path =
        selectedItem.path ||
        selectedItem.children?.find((child) => child.key === key)?.path;
      if (path) navigate(path);
    }
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => handleMenuClick(item.key)}
        >
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Sider
      theme="light"
      width={250}
      style={{
        position: isMobile ? "absolute" : "fixed",
        height: "100vh",
        top: "80px",
        left: isMobile ? "-250px" : 0,
        zIndex: 999,
        backgroundColor: "#fff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default DashboardSideBar;
