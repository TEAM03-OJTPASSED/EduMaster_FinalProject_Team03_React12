import { useLocation } from "react-router-dom"; // Import useLocation
import AdminSiderMenu from "../components/AdminSiderMenu";
import AdminContent from "./AdminDashboard/AdminContent";

const Adminpage = () => {
  const location = useLocation(); // Get current location

  // Determine if the welcome message should be displayed
  const showWelcomeMessage = location.pathname === "/admin";

  return (
    <div className="flex">
      <AdminSiderMenu />
      <div className="flex-grow p-4">
        {showWelcomeMessage && (
          <div className="font-bold text-4xl p-5">Welcome, Admin!</div>
        )}
        <AdminContent />
      </div>
    </div>
  );
};

export default Adminpage;
