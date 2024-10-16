import React from "react";

// Lazy-loaded components
export const CategoryManagement = React.lazy(
  () => import("../pages/AdminDashboard/categoryManagement")
);
export const AllCourse = React.lazy(
  () => import("../pages/AdminDashboard/monitors/course/AllCourse")
);
export const SessionList = React.lazy(
  () => import("../pages/AdminDashboard/monitors/course/SessionList")
);
export const LessonList = React.lazy(
  () => import("../pages/AdminDashboard/monitors/course/LessonList")
);
export const PendingCourse = React.lazy(
  () => import("../pages/AdminDashboard/monitors/pending_course/PendingCourse")
);
export const CourseList = React.lazy(
  () => import("../pages/AdminDashboard/monitors/course/CourseList.tsx")
);

export const PendingCourseList = React.lazy(
  () =>
    import("../pages/AdminDashboard/monitors/pending_course/PendingCourseList")
);
export const PendingSessionList = React.lazy(
  () =>
    import("../pages/AdminDashboard/monitors/pending_course/PendingSessionList")
);
export const PendingLessonList = React.lazy(
  () =>
    import("../pages/AdminDashboard/monitors/pending_course/PendingLessonList")
);
export const BlogManagement = React.lazy(
  () => import("../pages/AdminDashboard/BlogManagement")
);
export const CourseLog = React.lazy(
  () => import("../pages/AdminDashboard/CourseLog")
);
export const PurchaseLog = React.lazy(
  () => import("../pages/AdminDashboard/PurchaseLog")
);
export const InstructorPayout = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-management/InstructorPayout"
    )
);
export const InstructorOrder = React.lazy(
  () =>
    import("../pages/InstructorDashboard/instructor-management/InstructorOrder")
);
export const InstructorCourses = React.lazy(
  () =>
    import("../pages/InstructorDashboard/instructor-monitor/InstructorCourses")
);
export const InstructorCourseList = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-monitor/InstructorCourseList"
    )
);
export const IntructorSessionList = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-monitor/InstructorSessionList"
    )
);
export const InstructorLessonList = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-monitor/InstructorLessonList"
    )
);
export const InstructorCreateCourse = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-monitor/InstructorCreateCourse"
    )
);
export const InstructorCourseLog = React.lazy(
  () =>
    import("../pages/InstructorDashboard/instructor-report/InstructorCourseLog")
);
export const InstructorPurchaseLog = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-report/InstructorPurchaseLog"
    )
);
export const InstructorEarning = React.lazy(
  () =>
    import("../pages/InstructorDashboard/instructor-report/InstructorEarning")
);
export const InstructorDiscount = React.lazy(
  () =>
    import(
      "../pages/InstructorDashboard/instructor-management/InstructorDiscount"
    )
);
export const InstructorReview = React.lazy(
  () => import("../pages/InstructorDashboard/InstructorReview")
);
export const InstructorSetting = React.lazy(
  () => import("../pages/InstructorDashboard/InstructorSetting")
);
export const AdminContent = React.lazy(
  () => import("../pages/AdminDashboard/AdminContent")
);
export const UserManagement = React.lazy(
  () => import("../pages/AdminDashboard/userManagement")
);
export const RequestUser = React.lazy(
  () => import("../pages/AdminDashboard/RequestUser")
);
export const StudentPage = React.lazy(
  () => import("../pages/Dashboard/Studentpage")
);
export const GeneralLayout = React.lazy(
  () => import("../defaultLayout/Layout")
);
export const HomePage = React.lazy(() => import("../pages/Homepage"));
export const Loginpage = React.lazy(
  () => import("../pages/AuthPage/LoginPage")
);
export const SignUppage = React.lazy(
  () => import("../pages/AuthPage/SignUpPage")
);

export const ContactPage = React.lazy(() => import("../pages/ContactPage"));
export const FAQsPage = React.lazy(() => import("../pages/FAQPage"));
export const ErrorPage = React.lazy(() => import("../pages/ErrorPage"));

export const InstructorLayout = React.lazy(
  () => import("../defaultLayout/InstructorLayout")
);
export const InstructorContent = React.lazy(
  () => import("../pages/InstructorDashboard/InstructorContent")
);
export const AdminLayout = React.lazy(
  () => import("../defaultLayout/AdminLayout")
);
export const ForgotPasswordPage = React.lazy(
  () => import("../pages/AuthPage/ForgotPasswordPage")
);
export const BlogDetailPage = React.lazy(
  () => import("../pages/BlogDetailPage")
);
export const PayoutManagement = React.lazy(
  () => import("../pages/AdminDashboard/payoutManagement")
);
