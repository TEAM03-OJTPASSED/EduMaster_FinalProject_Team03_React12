import { useLocation } from "react-router-dom"; // Import useLocation
import InstructorSiderMenu from "../../components/InstructorSiderMenu";
import InstructorContent from "../InstructorDashboard/InstructorContent";

const Instructorpage = () => {
  const location = useLocation(); // Get current location

  // Determine if the welcome message should be displayed
  const showWelcomeMessage = location.pathname === "/dashboard/instructor";

  return (
    <div className="flex">
      <InstructorSiderMenu />
      <div className="flex-grow p-4">
        {showWelcomeMessage && (
          <div className="font-bold text-4xl p-5">Welcome, Instructor!</div>
        )}
        <InstructorContent />
      </div>
    </div>
  );
};

export default Instructorpage;
