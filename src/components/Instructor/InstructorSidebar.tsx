import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  FormOutlined,
  FolderOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  FileTextOutlined,
  PercentageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    path: "/instructor/dashboard",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    label: "Management",
    children: [
      {
        key: "management-payout",
        icon: <MoneyCollectOutlined />,
        title: "Payout",
        path: "/instructor/payout",
      },
      {
        key: "management-order", // Đặt key duy nhất cho mục con
        icon: <BookOutlined />,
        title: "Order",
        path: "/instructor/order",
      },
      {
        key: "management-discount", // Đặt key duy nhất cho mục con
        icon: <PercentageOutlined />,
        title: "Discount",
        path: "/instructor/discount",
      },
    ],
  },
  {
    key: "monitor",
    icon: <PieChartOutlined />,
    label: "Monitor",
    children: [
      { key: "3-1", title: "My Courses", path: "/instructor/my-courses" },
      {
        key: "3-2",
        title: "Create Course",
        path: "/instructor/create-courses",
      },
    ],
  },
  {
    key: "reports",
    icon: <LineChartOutlined />,
    label: "Reports",
    children: [
      { key: "4-1", title: "Course log", path: "/instructor/course-log" },
      { key: "4-2", title: "Purchase log", path: "/instructor/purchase-log" },
      { key: "4-3", title: "Earning", path: "/instructor/earning" },
    ],
  },
  {
    key: "settings",
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

const InstructorSidebar: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick(); // Close Drawer if needed

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

  const renderMenuItems = (items: typeof menuItems) => {
    return items.map((item) => {
      const menuItem = {
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => handleMenuClick(item.key),
      };

      if (item.children) {
        // For submenu, use children
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: item.children.map((child) => ({
            key: child.key,
            icon: child.icon,
            label: child.label,
            onClick: () => handleMenuClick(child.key),
          })),
        };
      }
      return menuItem; // Return the regular menu item
    });
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={renderMenuItems(menuItems)}
    />
  );
};

export default InstructorSidebar;
