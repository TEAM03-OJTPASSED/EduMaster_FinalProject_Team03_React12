import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div>
      {/* Navbar section */}
      <div className="w-full h-20 flex items-center bg-white shadow">
        <Navbar />
      </div>

      {/* Content section */}
      <div className=" flex justify-center mt-4">
        <div className="w-[100%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
