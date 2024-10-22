import { Menu, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const items: MenuProps["items"] = [
  {
    label: "Request Payout",
    key: "Request Payout",
  },
  {
    label: "Completed Payout",
    key: "Completed Payout",
  },
  {
    label: "Rejected Payout",
    key: "Rejected Payout",
  }
];

const AdminPayout = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      naviagte("/dashboard/admin/payout", {
        replace: true,
        state: { status: ["Request Payout", "New"] },
      });
    }
  }, [location, naviagte]);
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Request Payout":
        naviagte("/dashboard/admin/payout", {state: {status: ["Request Payout", "New"]} });
        break;
      case "Completed Payout":
        naviagte("completed-payout", {state: {status: "Completed"} });
        break;
      case "Rejected Payout":
        naviagte("rejected-payout", {state: {status: "Rejected"} });
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

export default AdminPayout;
