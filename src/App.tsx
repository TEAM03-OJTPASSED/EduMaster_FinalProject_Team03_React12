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
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/userManagement";
import RequestUser from "./pages/RequestUser";
import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";
import CourseList from "./pages/AdminDashboard/monitors/course/CourseList";
import SessionList from "./pages/AdminDashboard/monitors/course/SessionList";
import LessonList from "./pages/AdminDashboard/monitors/course/LessonList";
import PendingCourse from "./pages/AdminDashboard/monitors/pending_course/PendingCourse";
import PendingSessionList from "./pages/AdminDashboard/monitors/pending_course/PendingSessionList";
import PendingLessonList from "./pages/AdminDashboard/monitors/pending_course/PendingLessonList";
import PendingCourseList from "./pages/AdminDashboard/monitors/pending_course/PendingCourseList";
import PayoutManagement from "./pages/AdminDashboard/payoutManagement";
import BlogManagement from "./pages/AdminDashboard/BlogManagement";

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminContent />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="request-management" element={<RequestUser />} />
          <Route path="all-courses" element={<AllCourse />}>
            <Route index element={<CourseList />} />
            <Route path="session" element={<SessionList />} />
            <Route path="lesson" element={<LessonList />} />
          </Route>
          <Route path="pending-courses" element={<PendingCourse />} >
          <Route index element={<PendingCourseList />} />
            <Route path="session" element={<PendingSessionList />} />
            <Route path="lesson" element={<PendingLessonList />} />
          </Route>
          <Route path="payout" element={<PayoutManagement />} />
          <Route path="blog" element={<BlogManagement />} />
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
