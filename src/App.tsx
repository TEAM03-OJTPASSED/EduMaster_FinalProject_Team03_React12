import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import AdminPage from "./pages/Dashboard/Adminpage";
import InstructorPage from "./pages/Dashboard/Instructorpage";
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
import AdminLayout from "./defaultLayout/AdminLayout";
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/userManagement";
import RequestUser from "./pages/RequestUser";

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

          {/* Protected routes */}
          <Route
            path="/dashboard/admin/*"
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            <Route index element={<AdminPage />} />
          </Route>
          <Route
            path="/dashboard/instructor/*"
            element={<ProtectedRoute allowedRoles={["instructor"]} />}
          >
            <Route index element={<InstructorPage />} />
          </Route>
          <Route
            path="/dashboard/student/*"
            element={<ProtectedRoute allowedRoles={["student"]} />}
          >
            <Route index element={<StudentPage />} />
          </Route>
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminContent />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="request-management" element={<RequestUser />} />
        </Route>

        {/* Instructor Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/instructor/dashboard/*" element={<Instructorpage />} />
        </Route>

        {/* Student Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/student/*" element={<Studentpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
