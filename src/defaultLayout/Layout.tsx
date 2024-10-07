import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import UserAuth from "../components/UserAuthTest";

const GeneralLayout = () => {
  return (
    <div className="div">
      {/* User test section */}
      <UserAuth />

      {/* Navbar section */}
      <div className="w-full h-16 left-0 flex items-center bg-white shadow">
        <Navbar />
      </div>

      {/* Content section */}
      <div className="pt-16 flex justify-center">
        <div className="w-[85%] min-h-screen ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GeneralLayout;
