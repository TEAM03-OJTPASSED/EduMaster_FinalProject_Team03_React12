import { useLocation } from "react-router-dom"; // Import useLocation
import InstructorSiderMenu from "../../components/InstructorSiderMenu";
import InstructorContent from "../InstructorDashboard/InstructorContent";

const Instructorpage = () => {
  const location = useLocation(); // Get current location

  return (
    <div className="flex">
      <InstructorSiderMenu />
    </div>
  );
};

export default Instructorpage;
