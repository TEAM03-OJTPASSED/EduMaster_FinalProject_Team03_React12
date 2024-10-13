import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

// Import các trang
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
import LoadingWrapper from "./components/Loading/LoadingWrapper";

function App() {
  return (
    <BrowserRouter>
      <LoadingWrapper>
        <Routes>
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
        </Routes>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
