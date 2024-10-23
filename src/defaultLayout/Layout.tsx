import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
// import UserAuth from "../components/UserAuthTest";
import Footer from "../components/Footer";
import { FaComments } from "react-icons/fa"; // Import only the Chat icon

const GeneralLayout = () => {
  return (
    <div className="div">
      {/* Auth User */}
      {/* <UserAuth /> */}
      {/* Navbar section */}
      <div className="w-full h-16 left-0 flex items-center bg-white shadow">
        <Navbar />
      </div>

      {/* Content section */}
      <div className="flex justify-center overflow-hidden">
        <div className="md:w-[85%] w-[95%]  min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Footer section */}
      <div className="w-full bg-gray-50">
        <Footer />
      </div>

      {/* Fixed Chat Bubbles */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-4">
        {/* Zalo Chat */}
        <a
          href="https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center zigzag"
        >
          <span className="font-bold text-lg">Zalo</span>
        </a>
        {/* Instructor Chat */}
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center zigzag">
          <FaComments size={24} />
        </button>
      </div>
    </div>
  );
};

export default GeneralLayout;
