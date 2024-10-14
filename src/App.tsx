import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import React from "react";

const CategoryManagement = React.lazy(() => import('./pages/AdminDashboard/categoryManagement'));
const AllCourse = React.lazy(() => import('./pages/AdminDashboard/monitors/course/AllCourse'));
const SessionList = React.lazy(() => import('./pages/AdminDashboard/monitors/course/SessionList'));
const LessonList = React.lazy(() => import('./pages/AdminDashboard/monitors/course/LessonList'));
const PendingCourse = React.lazy(() => import('./pages/AdminDashboard/monitors/pending_course/PendingCourse'));
const CourseList = React.lazy(() => import('./pages/AdminDashboard/monitors/course/CourseList'));
const PendingCourseList = React.lazy(() => import('./pages/AdminDashboard/monitors/pending_course/PendingCourseList'));
const PendingSessionList = React.lazy(() => import('./pages/AdminDashboard/monitors/pending_course/PendingSessionList'));
const PendingLessonList = React.lazy(() => import('./pages/AdminDashboard/monitors/pending_course/PendingLessonList'));
const BlogManagement = React.lazy(() => import('./pages/AdminDashboard/BlogManagement'));
const CourseLog = React.lazy(() => import('./pages/AdminDashboard/CourseLog'));
const PurchaseLog = React.lazy(() => import('./pages/AdminDashboard/PurchaseLog'));
const InstructorPayout = React.lazy(() => import('./pages/InstructorDashboard/instructor-management/InstructorPayout'));
const InstructorOrder = React.lazy(() => import('./pages/InstructorDashboard/instructor-management/InstructorOrder'));
const InstructorCourses = React.lazy(() => import('./pages/InstructorDashboard/instructor-monitor/InstructorCourses'));
const InstructorCourseList = React.lazy(() => import('./pages/InstructorDashboard/instructor-monitor/InstructorCourseList'));
const IntructorSessionList = React.lazy(() => import('./pages/InstructorDashboard/instructor-monitor/IntructorSessionList'));
const InstructorLessonList = React.lazy(() => import('./pages/InstructorDashboard/instructor-monitor/InstructorLessonList'));
const InstructorCreateCourse = React.lazy(() => import('./pages/InstructorDashboard/instructor-monitor/InstructorCreateCourse'));
const InstructorCourseLog = React.lazy(() => import('./pages/InstructorDashboard/instructor-report/InstructorCourseLog'));
const InstructorPurchaseLog = React.lazy(() => import('./pages/InstructorDashboard/instructor-report/InstructorPurchaseLog'));
const InstructorEarning = React.lazy(() => import('./pages/InstructorDashboard/instructor-report/InstructorEarning'));
const InstructorDiscount = React.lazy(() => import('./pages/InstructorDashboard/instructor-management/InstructorDiscount'));
const InstructorReview = React.lazy(() => import('./pages/InstructorDashboard/InstructorReview'));
const InstructorSetting = React.lazy(() => import('./pages/InstructorDashboard/InstructorSetting'));


// Lazy loading components
const AdminContent = React.lazy(
  () => import("./pages/AdminDashboard/AdminContent")
);
const UserManagement = React.lazy(
  () => import("./pages/AdminDashboard/userManagement")
);
const RequestUser = React.lazy(
  () => import("./pages/AdminDashboard/RequestUser")
);

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
