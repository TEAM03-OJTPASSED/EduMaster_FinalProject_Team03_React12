import { Route, Routes } from "react-router-dom";
import UserManagement from "./userManagement";
import CourseManagement from "./courseManagement";
import CategoryManagement from "./categoryManagement";
import PayoutManagement from "./payoutManagement";

const AdminContent = () => {
  return (
    <div>
      <Routes>
        <Route path="user-management" element={<UserManagement />} />
        <Route path="course-management" element={<CourseManagement />} />
        <Route path="category-management" element={<CategoryManagement />} />
        <Route path="payout-management" element={<PayoutManagement />} />
      </Routes>
    </div>
  );
};

export default AdminContent;
