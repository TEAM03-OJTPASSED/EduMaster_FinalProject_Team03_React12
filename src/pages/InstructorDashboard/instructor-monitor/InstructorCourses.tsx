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

const InstructorCourses = () => {
  const naviagte = useNavigate();
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Course":
        naviagte("/dashboard/instructor/my-courses");
        break;
      case "Session":
        naviagte("/dashboard/instructor/my-courses/session");
        break;
      case "Lesson":
        naviagte("/dashboard/instructor/my-courses/lesson");
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

export default InstructorCourses;
