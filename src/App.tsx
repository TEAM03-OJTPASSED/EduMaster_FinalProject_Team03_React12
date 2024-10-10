import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import GeneralLayout from "./defaultLayout/Layout";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import SignUpPage from "./pages/SignUppage";

import Loginpage from "./pages/AuthPage/Loginpage";
import SignUppage from "./pages/AuthPage/SignUppage";

import CoursesPage from "./pages/Coursespage";
import BlogPage from "./pages/Blogpage";
import ContactPage from "./pages/Contactpage";
import FAQsPage from "./pages/FAQspage";
import ErrorPage from "./pages/Errorpage";
import CourseDetailPage from "./pages/CourseDetailpage";
import ForgotPasswordPage from "./pages/ForgotPasswordpage";
import AdminPage from "./pages/Dashboard/Adminpage";
import InstructorPage from "./pages/Dashboard/Instructorpage";
import StudentPage from "./pages/Dashboard/Studentpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route path="/" element={<Homepage />} />

     
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUppage />} />

          <Route path="/dashboard/admin/*" element={<AdminPage />} />
          <Route path="/dashboard/instructor/*" element={<InstructorPage />} />
          <Route path="/dashboard/student/*" element={<StudentPage />} />
          <Route path="/course" element={<CoursesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;