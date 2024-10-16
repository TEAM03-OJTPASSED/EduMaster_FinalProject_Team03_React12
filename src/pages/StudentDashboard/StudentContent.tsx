import { Route, Routes } from "react-router-dom";
import StudentProfile from "./studentProfile";
import StudentCourseDetail from "./StudentCourses";

const StudentContent = () => {
  return (
    <div>
      <Routes>
        <Route path="profile" element={<StudentProfile />} />
        <Route path="course-detail" element={<StudentCourseDetail />} />
      </Routes>
    </div>
  );
};

export default StudentContent;
