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
  {
    label: "Course log",
    key: "course-log",
  },
];

const AllCourse = () => {
  const navigate = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Course":
        navigate("/dashboard/admin/all-courses");
        break;
      case "Session":
        navigate("/dashboard/admin/all-courses/session");
        break;
      case "Lesson":
        navigate("/dashboard/admin/all-courses/lesson");
        break;
      case "course-log":
        navigate("/dashboard/admin/all-courses/course-log");
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

export default AllCourse;
