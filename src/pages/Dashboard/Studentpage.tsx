import { useLocation } from "react-router-dom"; // Import useLocation
import StudentSiderMenu from "../../components/StudentSiderMenu";
import StudentContent from "../StudentDashboard/StudentContent";

const StudentPage = () => {
  const location = useLocation(); // Get current location

  // Determine if the welcome message should be displayed
  const showWelcomeMessage = location.pathname === "/dashboard/student";

  return (
    <div className="flex">
      <StudentSiderMenu />
      <div className="flex-grow p-4">
        {showWelcomeMessage && (
          <div className="font-bold text-4xl p-5">Welcome, Student!</div>
        )}
        <StudentContent />
      </div>
    </div>
  );
};

export default StudentPage;
