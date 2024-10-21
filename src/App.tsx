import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import { Suspense } from "react";
import CoursesPage from "./pages/CoursePage";
import BlogPage from "./pages/BlogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import GeneralLayout from "./defaultLayout/Layout";
import HomePage from "./pages/Homepage";
import AdminLayout from "./defaultLayout/AdminLayout";
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/userManagement";
import RequestUser from "./pages/AdminDashboard/RequestUser";
import CategoryManagement from "./pages/AdminDashboard/categoryManagement";
import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";

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
import IntructorSessionList from "./pages/InstructorDashboard/instructor-monitor/InstructorSessionList";
import InstructorLessonList from "./pages/InstructorDashboard/instructor-monitor/InstructorLessonList";
import InstructorCourseLog from "./pages/InstructorDashboard/instructor-report/InstructorCourseLog";
import InstructorPurchaseLog from "./pages/InstructorDashboard/instructor-report/InstructorPurchaseLog";
import InstructorReview from "./pages/InstructorDashboard/InstructorReview";
import InstructorSetting from "./pages/InstructorDashboard/instructor-setting/InstructorSetting";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import PayoutManagement from "./pages/AdminDashboard/payoutManagement";
import RequestPayout from "./pages/InstructorDashboard/instructor-management/payout/RequestPayout";
import CompletedPayout from "./pages/InstructorDashboard/instructor-management/payout/CompletedPayout";
import DashboardLayout from "./defaultLayout/DashboardLayout";
import StudentProfile from "./pages/StudentDashboard/studentProfile";
import StudentCourses from "./pages/StudentDashboard/StudentCourses";
import Loginpage from "./pages/AuthPage/LoginPage";
import SignUppage from "./pages/AuthPage/SignUpPage";
import FAQsPage from "./pages/FAQPage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Firebase from "./pages/Firebase";
import BlogDetailPage from "./pages/BlogDetailPage";
import StudentContent from "./pages/StudentDashboard/StudentContent";
import StudentOrders from "./pages/StudentDashboard/StudentOrders";
import CourseLists from "./pages/AdminDashboard/monitors/course/CourseLists";
import StudentSubscription from "./pages/StudentDashboard/StudentSubscriptions";
import VerifySuccessToken from "./pages/AuthPage/VerifyToken";

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
              <Route path="/verify-token" element={<VerifySuccessToken />} />
              <Route path="/course" element={<CoursesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/*" element={<ErrorPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/blog-detail/:id" element={<BlogDetailPage />} />
              <Route path="/course-detail/:id" element={<CourseDetailPage />} />
              <Route path="/firebase" element={<Firebase />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute
                    allowedRoles={["student", "instructor", "admin"]}
                  >
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin Layout */}
            <Route
              path="dashboard/admin"
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
                  <Route index element={<CourseLists />} />
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
                <Route path="settings" element={<AdminSetting />}>
                  <Route index element={<AdminProfile />} />
                  <Route
                    path="change-password"
                    element={<AdminChangePassword />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Instructor Layout */}
            <Route
              path="dashboard/instructor"
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
                <Route
                  path="sales-history"
                  element={<InstructorSalesHistory />}
                />
                <Route path="my-courses" element={<InstructorCourses />}>
                  <Route index element={<InstructorCourseList />} />
                  <Route path="session" element={<IntructorSessionList />} />
                  <Route path="lesson" element={<InstructorLessonList />} />
                </Route>

                <Route path="course-log" element={<InstructorCourseLog />} />
                <Route
                  path="purchase-log"
                  element={<InstructorPurchaseLog />}
                />
                <Route path="subscription" element={<InstructorSubscription />}>
                  <Route index element={<InstructorSubscribed />} />
                  <Route path="subscriber" element={<InstructorSubscriber />} />
                </Route>
                <Route path="review" element={<InstructorReview />} />
                <Route path="settings" element={<InstructorSetting />}>
                  <Route index element={<InstructorProfile />} />
                  <Route
                    path="change-password"
                    element={<InstructorChangePassword />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Student Layout */}

            <Route
              path="dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}></ProtectedRoute>
              }
            >
              <Route element={<DashboardLayout role="student" />}>
                <Route index element={<StudentContent />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="my-courses" element={<StudentCourses />} />
                <Route path="orders" element={<StudentOrders />} />
                <Route path="subscriptions" element={<StudentSubscription />} />
              </Route>
            </Route>
          </Routes>
        </LoadingWrapper>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
