import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  SettingOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    label: "Dashboard",
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
        key: "management-order",
        icon: <BookOutlined />,
        title: "Order",
        path: "/instructor/order",
      },
      {
        key: "management-sales-history",
        icon: <ShoppingCartOutlined />,
        title: "Sales History",
        path: "/instructor/sales-history",
      },
    ],
  },
  {
    key: "monitor",
    icon: <PieChartOutlined />,
    label: "Monitor",
    children: [
      {
        key: "3-1",
        title: "My Courses",
        icon: <BookOutlined />,
        path: "/instructor/my-courses",
      },
      {
        key: "3-2",
        title: "Create Course",
        icon: <FileTextOutlined />,
        path: "/instructor/create-courses",
      },
    ],
  },
  {
    key: "reports",
    icon: <LineChartOutlined />,
    label: "Reports",
    children: [
      {
        key: "4-1",
        title: "Course log",
        icon: <FileTextOutlined />,
        path: "/instructor/course-log",
      },
      {
        key: "4-2",
        title: "Purchase log",
        icon: <FileTextOutlined />,
        path: "/instructor/purchase-log",
      },
      {
        key: "4-3",
        title: "Earning",
        icon: <MoneyCollectOutlined />,
        path: "/instructor/earning",
      },
    ],
  },
  {
    key: "subscription",
    icon: <BellOutlined />,
    title: "Subscription",
    label: "Subscription",
    path: "/instructor/subscription",
  },
  {
    key: "6",
    icon: <StarOutlined />,
    title: "Review",
    label: "Review",
    path: "/instructor/review",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    title: "Settings",
    label: "Settings",
    path: "/instructor/settings",
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
        title: item.title,
        onClick: () => handleMenuClick(item.key),
      };

      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          title: item.title,
          children: item.children.map((child) => ({
            key: child.key,
            icon: child.icon,
            label: child.title,
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
