import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import UserAuth from "../components/UserAuthTest";

const GeneralLayout = () => {
  return (
    <div>
      {/* User test section */}
      <UserAuth />

      {/* Navbar section */}
      <div className="w-full h-20 flex items-center bg-white shadow">
        <Navbar />
      </div>

      {/* Content section */}
      <div className="pt-20 flex justify-center mt-4">
        <div className="w-[85%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GeneralLayout;
