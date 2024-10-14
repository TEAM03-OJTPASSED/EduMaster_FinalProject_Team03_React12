import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  FolderOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  PercentageOutlined,
  StarOutlined,
} from "@ant-design/icons";

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

const InstructorMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    path: "/instructor/dashboard",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    title: "Management",
    children: [
      {
        key: "management-payout",
        icon: <MoneyCollectOutlined />,
        title: "Payout",
        path: "/instructor/payout",
      },
      {
        key: "management-order",
        icon: <BookOutlined />,
        title: "Order",
        path: "/instructor/order",
      },
      {
        key: "management-discount",
        icon: <PercentageOutlined />,
        title: "Discount",
        path: "/instructor/discount",
      },
    ],
  },
  {
    key: "sub2",
    icon: <PieChartOutlined />,
    title: "Monitor",
    // children: [
    //   { key: "3-1", title: "My Courses", path: "/instructor/my-courses" },
    //   { key: "3-2", title: "Create Course", path: "/instructor/create-courses" },
    // ],
  },
  {
    key: "sub3",
    icon: <LineChartOutlined />,
    title: "Reports",
    // children: [
    //   { key: "4-1", title: "Course log", path: "/instructor/course-log" },
    //   { key: "4-2", title: "Purchase log", path: "/instructor/purchase-log" },
    //   { key: "4-3", title: "Earning", path: "/instructor/earning" },
    // ],
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    title: "Settings",
    path: "/instructor/settings",
  },
  {
    key: "6",
    icon: <StarOutlined />,
    title: "Review",
    path: "/instructor/review",
  },
];

const StudentMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    path: "/student/dashboard",
  },
  {
    key: "courses",
    icon: <FolderOutlined />,
    title: "My Courses",
    path: "/student/my-courses",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    title: "Profile",
    path: "/student/profile",
  },
];

const DashboardSideBar: React.FC<SideBarProps> = ({ role, onMenuClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const menuItems = role === "instructor" ? InstructorMenuItems : StudentMenuItems;

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick();

    const selectedItem = menuItems.find(
      (item) => item.key === key || item.children?.some((child) => child.key === key)
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
        <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
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