import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import React from "react";
import CategoryManagement from "./pages/AdminDashboard/categoryManagement";
import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";
import SessionList from "./pages/AdminDashboard/monitors/course/SessionList";
import LessonList from "./pages/AdminDashboard/monitors/course/LessonList";
import PendingCourse from "./pages/AdminDashboard/monitors/pending_course/PendingCourse";
import CourseList from "./pages/AdminDashboard/monitors/course/CourseList";
import PendingCourseList from "./pages/AdminDashboard/monitors/pending_course/PendingCourseList";
import PendingSessionList from "./pages/AdminDashboard/monitors/pending_course/PendingSessionList";
import PendingLessonList from "./pages/AdminDashboard/monitors/pending_course/PendingLessonList";
import BlogManagement from "./pages/AdminDashboard/BlogManagement";
import CourseLog from "./pages/AdminDashboard/CourseLog";
import PurchaseLog from "./pages/AdminDashboard/PurchaseLog";
import InstructorPayout from "./pages/InstructorDashboard/instructor-management/InstructorPayout";
import InstructorOrder from "./pages/InstructorDashboard/instructor-management/InstructorOrder";
import InstructorCourses from "./pages/InstructorDashboard/instructor-monitor/InstructorCourses";
import InstructorCourseList from "./pages/InstructorDashboard/instructor-monitor/InstructorCourseList";
import IntructorSessionList from "./pages/InstructorDashboard/instructor-monitor/IntructorSessionList";
import InstructorLessonList from "./pages/InstructorDashboard/instructor-monitor/InstructorLessonList";
import InstructorCreateCourse from "./pages/InstructorDashboard/instructor-monitor/InstructorCreateCourse";
import InstructorCourseLog from "./pages/InstructorDashboard/instructor-report/InstructorCourseLog";
import InstructorPurchaseLog from "./pages/InstructorDashboard/instructor-report/InstructorPurchaseLog";
import InstructorEarning from "./pages/InstructorDashboard/instructor-report/InstructorEarning";
import InstructorDiscount from "./pages/InstructorDashboard/instructor-management/InstructorDiscount";
import InstructorReview from "./pages/InstructorDashboard/InstructorReview";
import InstructorSetting from "./pages/InstructorDashboard/InstructorSetting";

// Lazy loading components
const AdminContent = React.lazy(
  () => import("./pages/AdminDashboard/AdminContent")
);
const UserManagement = React.lazy(
  () => import("./pages/AdminDashboard/userManagement")
);
const RequestUser = React.lazy(() => import("./pages/AdminDashboard/RequestUser"));

const StudentPage = React.lazy(() => import("./pages/Dashboard/Studentpage"));
const GeneralLayout = React.lazy(() => import("./defaultLayout/Layout"));
const HomePage = React.lazy(() => import("./pages/Homepage"));
const Loginpage = React.lazy(() => import("./pages/AuthPage/Loginpage"));
const SignUppage = React.lazy(() => import("./pages/AuthPage/SignUppage"));
const CoursesPage = React.lazy(() => import("./pages/Coursespage"));
const BlogPage = React.lazy(() => import("./pages/Blogpage"));
const ContactPage = React.lazy(() => import("./pages/Contactpage"));
const FAQsPage = React.lazy(() => import("./pages/FAQspage"));
const ErrorPage = React.lazy(() => import("./pages/Errorpage"));
const CourseDetailPage = React.lazy(() => import("./pages/CourseDetailpage"));

// const ForgotPasswordPage = React.lazy(
//   () => import("./pages/ForgotPasswordPage")
// );
const InstructorLayout = React.lazy(
  () => import("./defaultLayout/InstructorLayout")
);
const InstructorContent = React.lazy(
  () => import("./pages/InstructorDashboard/InstructorContent")
);
const AdminLayout = React.lazy(() => import("./defaultLayout/AdminLayout"));

function App() {
  return (
    <BrowserRouter>
      <LoadingWrapper>
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
              {/* <Route path="payout" element={<PayoutManagement />} /> */}
              <Route path="blog" element={<BlogManagement />} />
              <Route path="course-log" element={<CourseLog />} />
              <Route path="purchase-log" element={<PurchaseLog />} />
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
              <Route path="my-courses" element={<InstructorCourses />}>
                <Route index element={<InstructorCourseList />} />
                <Route path="session" element={<IntructorSessionList />} />
                <Route path="lesson" element={<InstructorLessonList />} />
              </Route>
              <Route
                path="create-courses"
                element={<InstructorCreateCourse />}
              />
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
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
