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
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    key: "management",
    icon: <BarChartOutlined />,
    title: "Management",
    children: [
      {
        key: "management-users", // Đặt key duy nhất cho mục con
        icon: <UserOutlined />,
        title: "Users",
        path: "/admin/users",
      },
      {
        key: "management-requests", // Đặt key duy nhất cho mục con
        icon: <FormOutlined />,
        title: "Request",
        path: "/admin/request-management",
      },
      {
        key: "management-categories", // Đặt key duy nhất cho mục con
        icon: <FolderOutlined />,
        title: "Category",
        path: "/admin/categories",
      },
      {
        key: "management-payout", // Đặt key duy nhất cho mục con
        icon: <MoneyCollectOutlined />,
        title: "Payout",
        path: "/admin/payout",
      },
      {
        key: "management-blog", // Đặt key duy nhất cho mục con
        icon: <FileTextOutlined />,
        title: "Blog",
        path: "/admin/blog",
      },
    ],
  },
  {
    key: "sub2",
    icon: <PieChartOutlined />,
    title: "Monitor",
    children: [
      { key: "3-1", title: "All Courses", path: "/admin/all-courses" },
      { key: "3-2", title: "Pending Course", path: "/admin/pending-courses" },
    ],
  },
  {
    key: "sub3",
    icon: <LineChartOutlined />,
    title: "Reports",
    children: [
      { key: "4-1", title: "Course log", path: "/admin/course-log" },
      { key: "4-2", title: "Purchase log", path: "/admin/purchase-log" },
    ],
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    title: "Settings",
    path: "/admin/settings",
  },
];

const AdminSidebar: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (onMenuClick) onMenuClick(); // Đóng Drawer nếu cần

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
    <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
      {renderMenuItems(menuItems)}
    </Menu>
  );
};

export default AdminSidebar;
