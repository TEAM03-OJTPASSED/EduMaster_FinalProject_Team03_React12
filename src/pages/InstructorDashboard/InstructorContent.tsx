import { Route, Routes } from "react-router-dom";
import InstructorProfile from "./instructorProfile";
import PayoutManagement from "./payoutManagement";
import InstructorCourseManagement from "./instructor-courseManagement";

const InstructorContent = () => {
  return (
    <div>
      <Routes>
        <Route path="profile" element={<InstructorProfile />} />
        <Route
          path="course-management"
          element={<InstructorCourseManagement />}
        />
        <Route path="payout-management" element={<PayoutManagement />} />
      </Routes>
    </div>
  );
};

export default InstructorContent;
