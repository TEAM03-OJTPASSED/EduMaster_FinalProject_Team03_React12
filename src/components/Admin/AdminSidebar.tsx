import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  FormOutlined,
  FolderOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  SettingOutlined,
  BookOutlined,
  HourglassOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  key: string;
  icon?: React.ReactNode; // Icon là tùy chọn
  label: string;
  path?: string;
  items?: MenuItem[]; // Các item con là một danh sách MenuItem
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/dashboard/admin/",
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
        path: "/dashboard/admin/users",
      },
      {
        key: "management-requests",
        icon: <FormOutlined />,
        label: "Request",
        path: "/dashboard/admin/request-management",
      },
      {
        key: "management-categories",
        icon: <FolderOutlined />,
        label: "Categories",
        path: "/dashboard/admin/categories",
      },
      {
        key: "management-payout",
        icon: <MoneyCollectOutlined />,
        label: "Payout",
        path: "/dashboard/admin/payout",
      },
      {
        key: "management-blog",
        icon: <FileTextOutlined />,
        label: "Blog",
        path: "/dashboard/admin/blog",
      },
      {
        key: "all-courses",
        icon: <BookOutlined />,
        label: "All Courses",
        path: "/dashboard/admin/all-courses",
      },
      {
        key: "pending-courses",
        icon: <HourglassOutlined />,
        label: "Pending Course",
        path: "/dashboard/admin/pending-courses",
      },
      {
        key: "purchase-log",
        icon: <ShoppingCartOutlined />,
        label: "Purchase log",
        path: "/dashboard/admin/purchase-log",
      },
    ],
  },
  {
    key: "top-up",
    icon: <WalletOutlined />,
    label: "Top Up",
    path: "/dashboard/admin/top-up",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/dashboard/admin/settings",
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
            icon: child.icon,
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
