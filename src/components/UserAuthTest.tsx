import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar_url: string;
  video_url: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  is_deleted: boolean;
  _id: string;
  dob: string;
  created_at: string;
  updated_at: string;
}

const student: User = {
  email: "student@example.com",
  name: "Student",
  google_id: "",
  role: "student",
  status: true,
  description: "Hello, I am a student.",
  phone_number: "0123456789",
  avatar_url: "https://picsum.photos/seed/student/200/300",
  video_url:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  is_verified: true,
  token_version: 1,
  balance: 100,
  balance_total: 100,
  bank_name: "StudentBank",
  bank_account_no: "1234567890",
  bank_account_name: "Student Name",
  is_deleted: false,
  _id: "1234567890abcdef",
  dob: "2000-01-01T00:00:00.000Z",
  created_at: "2023-10-01T00:00:00.000Z",
  updated_at: "2023-10-01T00:00:00.000Z",
};

const instructor: User = {
  email: "instructor@example.com",
  name: "Instructor",
  google_id: "",
  role: "instructor",
  status: true,
  description: "Hello, I am an instructor.",
  phone_number: "0987654321",
  avatar_url: "https://picsum.photos/seed/instructor/200/300",
  video_url:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  is_verified: false,
  token_version: 0,
  balance: 0,
  balance_total: 0,
  bank_name: "InstructorBank",
  bank_account_no: "0987654321",
  bank_account_name: "Instructor Name",
  is_deleted: false,
  _id: "abcdef1234567890",
  dob: "1980-01-01T00:00:00.000Z",
  created_at: "2023-10-01T00:00:00.000Z",
  updated_at: "2023-10-01T00:00:00.000Z",
};

const admin: User = {
  email: "admin@example.com",
  name: "Admin",
  google_id: "",
  role: "admin",
  status: true,
  description: "Hello, I am an admin.",
  phone_number: "0123456789",
  avatar_url: "https://picsum.photos/seed/admin/200/300",
  video_url:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  is_verified: true,
  token_version: 1,
  balance: 1000,
  balance_total: 1000,
  bank_name: "AdminBank",
  bank_account_no: "1234567890",
  bank_account_name: "Admin Name",
  is_deleted: false,
  _id: "abcdef1234567890",
  dob: "1970-01-01T00:00:00.000Z",
  created_at: "2023-10-01T00:00:00.000Z",
  updated_at: "2023-10-01T00:00:00.000Z",
};

const UserAuth = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("User");
  const currentUserRole = currentUser ? JSON.parse(currentUser).role : "guest";
  const setUser = (role: string) => {
    const userMap: { [key: string]: User } = {
      student,
      instructor,
      admin,
    };

    if (role.toLowerCase() === "guest") {
      localStorage.removeItem("User");
    } else {
      const selectedUser = userMap[role.toLowerCase()];
      if (selectedUser) {
        localStorage.setItem("User", JSON.stringify(selectedUser));
      }
    }
    navigate("/");
  };

  return (
    <div className="border border-rose-500 p-2 flex gap-4 items-center cursor-pointer">
      <div className="w-1/2 flex items-center">
        <div className="w-60">
          <div>Sample Test Account</div>
          <div>Current logged as: {currentUserRole}</div>
        </div>
        <div className="flex gap-2">
          <div
            className="w-20 text-center py-1 border-2 border-neutral-400 rounded-md  cursor-pointer"
            onClick={() => setUser("Guest")}
          >
            Guest
          </div>
          <div
            className="w-20 text-center py-1 border-2 border-green-400 rounded-md cursor-pointer"
            onClick={() => setUser("Student")}
          >
            Student
          </div>
          <div
            className="w-20 text-center py-1 border-2 border-orange-400 rounded-md cursor-pointer"
            onClick={() => setUser("Instructor")}
          >
            Instructor
          </div>
          <div
            className="w-20 text-center py-1 border-2 border-red-400 rounded-md cursor-pointer"
            onClick={() => setUser("Admin")}
          >
            Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
