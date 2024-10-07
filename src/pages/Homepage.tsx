import { useCustomNavigate } from "../hooks/customNavigate";

const Homepage = () => {
  const navigate = useCustomNavigate();
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/admin")}
        >
          Admin Dashboard
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/instructor")}
        >
          Instructor Dashboard
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/student")}
        >
          Student Dashboard
        </button>
      </div>
      <div className="mt-4 w-full text-left">Homepage</div>
    </div>
  );
};

export default Homepage;
