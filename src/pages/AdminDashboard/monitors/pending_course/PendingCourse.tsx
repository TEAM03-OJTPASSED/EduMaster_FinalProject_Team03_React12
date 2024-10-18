import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    label: "Course",
    key: "Course",
  },
  {
    label: "Session",
    key: "Session",
  },
  {
    label: "Lesson",
    key: "Lesson",
  },
];

const PendingCourse = () => {
  const navigate = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Course":
        navigate("/dashboard/admin/pending-courses/");
        break;
      case "Session":
        navigate("/dashboard/admin/pending-courses/session");
        break;
      case "Lesson":
        navigate("/dashboard/admin/pending-courses/lesson");
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
        defaultSelectedKeys={["Course"]}
        onClick={handleSelectMenu}
      />
      <Outlet />
    </div>
  );
};

export default PendingCourse;
