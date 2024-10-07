import { useLocation } from "react-router-dom"; // Import useLocation
import AdminSiderMenu from "../../components/AdminSiderMenu";
import AdminContent from "../AdminDashboard/AdminContent";

const Adminpage = () => {
  const location = useLocation(); // Get current location

  return (
    <div className="flex">
      <AdminSiderMenu />
    </div>
  );
};

export default Adminpage;
