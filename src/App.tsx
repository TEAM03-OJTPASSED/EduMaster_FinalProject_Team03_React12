import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import AdminLayout from "./defaultLayout/AdminLayout";
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/UserManagement";
import RequestUser from "./pages/AdminDashboard/RequestUser";

import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";
import CourseList from "./pages/AdminDashboard/monitors/course/CourseList";
import SessionList from "./pages/AdminDashboard/monitors/course/SessionList";
import LessonList from "./pages/AdminDashboard/monitors/course/LessonList";
import PendingCourse from "./pages/AdminDashboard/monitors/pending_course/PendingCourse";
import PendingSessionList from "./pages/AdminDashboard/monitors/pending_course/PendingSessionList";
import PendingLessonList from "./pages/AdminDashboard/monitors/pending_course/PendingLessonList";
import PendingCourseList from "./pages/AdminDashboard/monitors/pending_course/PendingCourseList";
import PayoutManagement from "./pages/AdminDashboard/PayoutManagement";
import BlogManagement from "./pages/AdminDashboard/BlogManagement";

import StudentPage from "./pages/Dashboard/Studentpage";
import GeneralLayout from "./defaultLayout/Layout";
import HomePage from "./pages/Homepage";
import Loginpage from "./pages/AuthPage/Loginpage";
import SignUppage from "./pages/AuthPage/SignUppage";
import CoursesPage from "./pages/CoursesPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/Contactpage";
import FAQsPage from "./pages/FAQspage";
import ErrorPage from "./pages/Errorpage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import InstructorLayout from "./defaultLayout/InstructorLayout";
import InstructorContent from "./pages/InstructorDashboard/InstructorContent";
import CategoryManagement from "./pages/AdminDashboard/CategoryManagement";
import InstructorPayout from "./pages/InstructorDashboard/instructor-management/InstructorPayout";
import InstructorOrder from "./pages/InstructorDashboard/instructor-management/InstructorOrder";
import InstructorDiscount from "./pages/InstructorDashboard/instructor-management/InstructorDiscount";
import InstructorCourseLog from "./pages/InstructorDashboard/instructor-report/InstructorCourseLog";
import InstructorCourses from "./pages/InstructorDashboard/instructor-monitor/InstructorCourses";
import InstructorCreateCourse from "./pages/InstructorDashboard/instructor-monitor/InstructorCreateCourse";
import InstructorPurchaseLog from "./pages/InstructorDashboard/instructor-report/InstructorPurchaseLog";
import InstructorEarning from "./pages/InstructorDashboard/instructor-report/InstructorEarning";
import InstructorReview from "./pages/InstructorDashboard/InstructorReview";
import InstructorSetting from "./pages/InstructorDashboard/InstructorSetting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Layout */}
        <Route path="/" element={<GeneralLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/course" element={<CoursesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute
                allowedRoles={["student", "instructor", "admin"]}
              />
            }
          >
            <Route index element={<CourseDetailPage />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/dashboard/student/*"
            element={<ProtectedRoute allowedRoles={["student"]} />}
          >
            <Route index element={<StudentPage />} />
          </Route>
        </Route>

        {/* Admin Layout */}

        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          <Route element={<AdminLayout />}>
            <Route index element={<AdminContent />} />
            <Route path="dashboard" element={<AdminContent />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="request-management" element={<RequestUser />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="all-courses" element={<AllCourse />}>
              <Route index element={<CourseList />} />
              <Route path="session" element={<SessionList />} />
              <Route path="lesson" element={<LessonList />} />
            </Route>
            <Route path="pending-courses" element={<PendingCourse />}>
              <Route index element={<PendingCourseList />} />
              <Route path="session" element={<PendingSessionList />} />
              <Route path="lesson" element={<PendingLessonList />} />
            </Route>
            <Route path="payout" element={<PayoutManagement />} />
            <Route path="blog" element={<BlogManagement />} />
          </Route>
        </Route>

        {/* Instructor Layout */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}></ProtectedRoute>
          }
        >
          <Route element={<InstructorLayout />}>
            <Route index element={<InstructorContent />} />
            <Route path="dashboard" element={<InstructorContent />} />
            <Route path="payout" element={<InstructorPayout />} />
            <Route path="order" element={<InstructorOrder />} />
            <Route path="my-courses" element={<InstructorCourses />} />
            <Route path="create-courses" element={<InstructorCreateCourse />} />
            <Route path="course-log" element={<InstructorCourseLog />} />
            <Route path="purchase-log" element={<InstructorPurchaseLog />} />
            <Route path="earning" element={<InstructorEarning />} />
            <Route path="discount" element={<InstructorDiscount />} />
            <Route path="review" element={<InstructorReview />} />
            <Route path="settings" element={<InstructorSetting />} />
          </Route>
        </Route>

        {/* Student Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/student/*" element={<StudentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
