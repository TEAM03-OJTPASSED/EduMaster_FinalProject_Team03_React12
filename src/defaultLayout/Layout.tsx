import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";

const GeneralLayout = () => {
  return (
    <div>
      {/* Navbar section */}
      <div className="w-full h-20 fixed top-0 left-0 flex items-center bg-white shadow">
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
