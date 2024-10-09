import { Outlet } from "react-router-dom"; // Import Outlet
import AdminNavBar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      {/* Navbar section */}
      <div className="w-full flex items-center bg-white shadow">
        <AdminNavBar />
      </div>

      {/* Content section */}
      <div className=" flex justify-center">
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
