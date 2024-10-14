import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import React from "react";

// Lazy loading components
const AdminContent = React.lazy(
  () => import("./pages/AdminDashboard/AdminContent")
);
const UserManagement = React.lazy(
  () => import("./pages/AdminDashboard/userManagement")
);
const RequestUser = React.lazy(() => import("./pages/RequestUser"));
const InstructorPage = React.lazy(
  () => import("./pages/Dashboard/Instructorpage")
);
const StudentPage = React.lazy(() => import("./pages/Dashboard/Studentpage"));
const GeneralLayout = React.lazy(() => import("./defaultLayout/Layout"));
const HomePage = React.lazy(() => import("./pages/Homepage"));
const Loginpage = React.lazy(() => import("./pages/AuthPage/Loginpage"));
const SignUppage = React.lazy(() => import("./pages/AuthPage/SignUppage"));
const CoursesPage = React.lazy(() => import("./pages/CoursesPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const ContactPage = React.lazy(() => import("./pages/Contactpage"));
const FAQsPage = React.lazy(() => import("./pages/FAQspage"));
const ErrorPage = React.lazy(() => import("./pages/Errorpage"));
const CourseDetailPage = React.lazy(() => import("./pages/CourseDetailPage"));
const ForgotPasswordPage = React.lazy(
  () => import("./pages/ForgotPasswordPage")
);
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
              <Route path="dashboard" element={<InstructorPage />} />
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
