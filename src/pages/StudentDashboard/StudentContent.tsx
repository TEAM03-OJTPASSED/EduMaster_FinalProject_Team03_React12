import { Route, Routes } from "react-router-dom";
import StudentProfile from "./studentProfile";
import StudentCourseDetail from "./student-courseDetail";

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
