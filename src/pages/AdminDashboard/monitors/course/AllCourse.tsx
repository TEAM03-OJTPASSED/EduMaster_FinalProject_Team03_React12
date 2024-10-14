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

const AllCourse = () => {
  const naviagte = useNavigate()
  const handleSelectMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "Course":
        naviagte("/admin/all-courses")
        break;
      case "Session":
      
        naviagte("/admin/all-courses/session")
        break;
      case "Lesson":
        naviagte("/admin/all-courses/lesson")
        
        break;
      default:
        break
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
      <Outlet/>
    </div>
  );
};

export default AllCourse;