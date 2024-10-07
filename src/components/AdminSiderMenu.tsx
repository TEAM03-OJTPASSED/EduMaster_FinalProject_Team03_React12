import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "user-management",
    label: "User Management",
    icon: <UserOutlined />,
  },
  {
    key: "course-management",
    label: "Course Management",
    icon: <AppstoreOutlined />,
  },
  {
    key: "category-management",
    label: "Category Management",
    icon: <AppstoreOutlined />,
  },
  {
    key: "payout-management",
    label: "Payout Management",
    icon: <DollarOutlined />,
  },
];

const AdminSiderMenu: React.FC = () => {
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState<string>(""); // Empty string for default

  const navigate = useNavigate();

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "user-management":
        navigate("/dashboard/admin/user-management");
        break;
      case "course-management":
        navigate("/dashboard/admin/course-management");
        break;
      case "category-management":
        navigate("/dashboard/admin/category-management");
        break;
      case "payout-management":
        navigate("/dashboard/admin/payout-management");
        break;

      default:
        break;
    }
  };

  // Theme toggle button
  const themeToggleItem: MenuItem = {
    key: "theme-toggle",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
    ),
    icon: null,
  };

  // Combine theme toggle and other menu items
  const combinedItems = [...items, themeToggleItem];

  return (
    <div style={{ width: 256 }}>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256 }}
        selectedKeys={[current]}
        mode="inline"
        items={combinedItems}
      />
    </div>
  );
};

export default AdminSiderMenu;
