import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import { Suspense } from "react";
import CoursesPage from "./pages/CoursesPage";
import BlogPage from "./pages/BlogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import GeneralLayout from "./defaultLayout/Layout";
import HomePage from "./pages/Homepage";
import Loginpage from "./pages/AuthPage/Loginpage";
import SignUppage from "./pages/AuthPage/SignUppage";
import ContactPage from "./pages/Contactpage";
import FAQsPage from "./pages/FAQspage";
import ErrorPage from "./pages/Errorpage";
import StudentPage from "./pages/Dashboard/Studentpage";
import AdminLayout from "./defaultLayout/AdminLayout";
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/userManagement";
import RequestUser from "./pages/AdminDashboard/RequestUser";
import CategoryManagement from "./pages/AdminDashboard/categoryManagement";
import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";
import CourseList from "./pages/AdminDashboard/payoutManagement";
import SessionList from "./pages/AdminDashboard/monitors/course/SessionList";
import LessonList from "./pages/AdminDashboard/monitors/course/LessonList";
import PendingCourse from "./pages/AdminDashboard/monitors/pending_course/PendingCourse";
import PendingCourseList from "./pages/AdminDashboard/monitors/pending_course/PendingCourseList";
import PendingSessionList from "./pages/AdminDashboard/monitors/pending_course/PendingSessionList";
import PendingLessonList from "./pages/AdminDashboard/monitors/pending_course/PendingLessonList";
import BlogManagement from "./pages/AdminDashboard/BlogManagement";
import CourseLog from "./pages/AdminDashboard/CourseLog";
import PurchaseLog from "./pages/AdminDashboard/PurchaseLog";
import InstructorLayout from "./defaultLayout/InstructorLayout";
import InstructorContent from "./pages/InstructorDashboard/InstructorContent";
import InstructorPayout from "./pages/InstructorDashboard/instructor-management/payout/InstructorPayout";
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
import InstructorSetting from "./pages/InstructorDashboard/setting/InstructorSetting";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import PayoutManagement from "./pages/AdminDashboard/payoutManagement";
import RequestPayout from "./pages/InstructorDashboard/instructor-management/payout/RequestPayout";
import CompletedPayout from "./pages/InstructorDashboard/instructor-management/payout/CompletedPayout";
import Profile from "./pages/InstructorDashboard/setting/Profile";
import ChangePassword from "./pages/InstructorDashboard/setting/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingWrapper />}>
        <LoadingWrapper>
          <Routes>
            {/* General Layout */}
            <Route path="/" element={<GeneralLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/signup" element={<SignUppage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
                <Route path="payout" element={<PayoutManagement />} />
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
                <Route path="payout" element={<InstructorPayout />}>
                  <Route index element={<RequestPayout />} />
                  <Route
                    path="completed-payout"
                    element={<CompletedPayout />}
                  />
                </Route>
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
                <Route
                  path="purchase-log"
                  element={<InstructorPurchaseLog />}
                />
                <Route path="earning" element={<InstructorEarning />} />
                <Route path="discount" element={<InstructorDiscount />} />
                <Route path="review" element={<InstructorReview />} />
                <Route path="settings" element={<InstructorSetting />} >
                <Route index element={<Profile />} />
                  <Route
                    path="change-password"
                    element={<ChangePassword />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Student Layout */}
            <Route element={<AdminLayout />}>
              <Route path="/dashboard/student/*" element={<StudentPage />} />
            </Route>
          </Routes>
        </LoadingWrapper>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
