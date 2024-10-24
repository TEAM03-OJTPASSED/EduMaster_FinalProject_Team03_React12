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
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    label: "Management",
    items: [
      {
        key: "management-users",
        icon: <UserOutlined />,
        label: "Users",
        path: "/admin/users",
      },
      {
        key: "management-requests",
        icon: <FormOutlined />,
        label: "Request",
        path: "/admin/request-management",
      },
      {
        key: "management-categories",
        icon: <FolderOutlined />,
        label: "Category",
        path: "/admin/categories",
      },
      {
        key: "management-payout",
        icon: <MoneyCollectOutlined />,
        label: "Payout",
        path: "/admin/payout",
      },
      {
        key: "management-blog",
        icon: <FileTextOutlined />,
        label: "Blog",
        path: "/admin/blog",
      },
    ],
  },
  {
    key: "monitor",
    icon: <PieChartOutlined />,
    label: "Monitor",
    items: [
      { key: "all-courses", label: "All Courses", path: "/admin/all-courses" },
      {
        key: "pending-courses",
        label: "Pending Course",
        path: "/admin/pending-courses",
      },
    ],
  },
  {
    key: "reports",
    icon: <LineChartOutlined />,
    label: "Reports",
    items: [
      { key: "course-log", label: "Course log", path: "/admin/course-log" },
      {
        key: "purchase-log",
        label: "Purchase log",
        path: "/admin/purchase-log",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/admin/settings",
  },
];

const AdminSidebar: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick(); // Close Drawer if needed

    const selectedItem = menuItems.find(
      (item) =>
        item.key === key || item.items?.some((child) => child.key === key)
    );
    if (selectedItem) {
      const path =
        selectedItem.path ||
        selectedItem.items?.find((child) => child.key === key)?.path;
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

      if (item.items) {
        // For submenu, use items
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: item.items.map((child) => ({
            key: child.key,
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

export default AdminSidebar;
