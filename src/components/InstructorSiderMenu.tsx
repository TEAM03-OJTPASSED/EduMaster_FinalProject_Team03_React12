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
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "course-management",
    label: "Course Management",
    icon: <AppstoreOutlined />,
  },
  {
    key: "payout-management",
    label: "Payout Management",
    icon: <DollarOutlined />,
  },
];

const InstructorSiderMenu: React.FC = () => {
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    // Navigate to the corresponding page based on the clicked key
    switch (e.key) {
      case "profile":
        navigate("/instructor/profile"); // Navigate to Profile page
        break;
      case "course-management":
        navigate("/instructor/course-management"); // Navigate to Course Management page
        break;
      case "payout-management":
        navigate("/instructor/payout-management"); // Navigate to Payout Management page
        break;
      default:
        break;
    }
  };

  // Add a theme toggle item
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
    icon: null, // No icon for this item
  };

  // Insert the theme toggle into the menu items
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

export default InstructorSiderMenu;
