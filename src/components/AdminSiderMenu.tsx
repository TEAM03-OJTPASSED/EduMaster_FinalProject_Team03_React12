// AdminSiderMenu.tsx
import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const AdminSiderMenu: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      onClick={onMenuClick} // Đóng Drawer khi chọn menu
    >
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<BarChartOutlined />}>
        Analysis
      </Menu.Item>
      <Menu.Item key="3" icon={<PieChartOutlined />}>
        Monitor
      </Menu.Item>
      <Menu.Item key="4" icon={<LineChartOutlined />}>
        Reports
      </Menu.Item>
      <Menu.Item key="5" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default AdminSiderMenu;
