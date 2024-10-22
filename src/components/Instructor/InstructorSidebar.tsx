import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  SettingOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
    label: "Dashboard",
    path: "/dashboard/instructor/",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    label: "Management",
    children: [
      {
        key: "3-1",
        title: "My Courses",
        icon: <BookOutlined />,
        path: "/dashboard/instructor/my-courses",
      },
      {
        key: "management-payout",
        icon: <MoneyCollectOutlined />,
        title: "Payout",
        path: "/dashboard/instructor/payout",
      },
      {
        key: "management-order",
        icon: <BookOutlined />,
        title: "My Learning",
        path: "/dashboard/instructor/my-learning",
      },
      {
        key: "management-salesHistory",
        icon: <ShoppingCartOutlined />,
        title: "Sales History",
        path: "/dashboard/instructor/salesHistory",
      },
      
    ],
  },
  {
    key: "reports",
    icon: <LineChartOutlined />,
    label: "Reports",
    children: [
     
    ],
  },
  {
    key: "subscription",
    icon: <UserOutlined />,
    title: "Subscription",
    label: "Subscription",
    path: "/dashboard/instructor/subscription",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    title: "Settings",
    label: "Settings",
    path: "/dashboard/instructor/settings",
  },
  {
    key: "6",
    icon: <StarOutlined />,
    title: "Review",
    label: "Review",
    path: "/dashboard/instructor/review",
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
