import React, { ChangeEvent, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    label: "Request Payout",
    key: "Request Payout",
  },
  {
    label: "Completed Payout",
    key: "Completed Payout",
  },
];

const InstructorPayout = () => {
  const naviagte = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Request Payout":
        naviagte("/instructor/payout");
        break;
      case "Completed Payout":
        naviagte("/instructor/payout/completed-payout");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Menu
        items={items}
        mode="horizontal"
        defaultSelectedKeys={["Request Payout"]}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default InstructorPayout;
