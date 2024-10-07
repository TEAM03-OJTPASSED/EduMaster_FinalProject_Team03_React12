import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import SignUppage from "./pages/SignUppage";
import Homepage from "./pages/Homepage";
import GeneralLayout from "./defaultLayout/Layout";
import Adminpage from "./pages/Dashboard/Adminpage";
import Instructorpage from "./pages/Dashboard/Instructorpage";
import Studentpage from "./pages/Dashboard/Studentpage";
import Coursespage from "./pages/Coursespage";
import Blogpage from "./pages/Blogpage";
import Contactpage from "./pages/Contactpage";
import FAQspage from "./pages/FAQspage";
import Errorpage from "./pages/Errorpage";
import CourseDetailpage from "./pages/CourseDetailpage";
import ForgotPasswordpage from "./pages/ForgotPasswordpage";
import AdminLayout from "./defaultLayout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Layout */}
        <Route path="/" element={<GeneralLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/dashboard/admin/*" element={<Adminpage />} />
          <Route path="/dashboard/instructor/*" element={<Instructorpage />} />
          <Route path="/dashboard/student/*" element={<Studentpage />} />
          <Route path="/course" element={<Coursespage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/faqs" element={<FAQspage />} />
          <Route path="/error" element={<Errorpage />} />
          <Route path="/detail/:id" element={<CourseDetailpage />} />
          <Route path="/forgot-password" element={<ForgotPasswordpage />} />
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Adminpage />} />
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
