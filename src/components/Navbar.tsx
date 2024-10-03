import { Input } from "antd";
import logoImage from "../assets/EduMaster.png";
import { useCustomNavigate } from "../hooks/customNavigate";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const navigate = useCustomNavigate();
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setSearchExpanded(!searchExpanded);
  };

  return (
    <div className="w-full h-20 flex items-center justify-between p-4 bg-white shadow-md">
      <img
        src={logoImage}
        alt="EduMaster logo"
        className={`max-h-[80%] max-w-[40%] object-contain cursor-pointer transition-opacity duration-200 ${
          searchExpanded ? "opacity-0" : "opacity-100"
        }`} // Ẩn logo khi ô tìm kiếm mở
        onClick={() => navigate("/")}
      />
      <div
        className={`transition-all duration-300 ${
          searchExpanded ? "absolute right-0 w-full" : "max-w-[300px]"
        }`}
      >
        {" "}
        {/* Chiều rộng của ô tìm kiếm */}
        <Input
          placeholder="Search for anything . . ."
          style={{
            width: "95%",
            height: 40,
            borderRadius: "20px",
          }}
          prefix={<AiOutlineSearch className="text-gray-400" />}
          className="mx-2"
          onFocus={handleSearchClick} // Gọi hàm khi ô tìm kiếm được nhấn
          onBlur={() => setSearchExpanded(false)} // Đặt lại trạng thái khi mất tiêu điểm
        />
      </div>
      <div
        className={`flex m-2 gap-2 md:gap-3 items-center transition-opacity duration-200 ${
          searchExpanded ? "opacity-0" : "opacity-100"
        }`}
      >
        {" "}
        {/* Ẩn các nút khi ô tìm kiếm mở */}
        <button
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600 text-sm md:text-base"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="px-3 py-1.5 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600 text-sm md:text-base"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Media query: áp dụng chỉ cho màn hình nhỏ */}
      <style>
        {`
          @media (min-width: 768px) {
            .navbar-search {
              position: relative; /* Đặt lại vị trí cho màn hình lớn */
              width: auto; /* Chiều rộng tự động trên máy tính */
            }
            .navbar-search.expanded {
              position: relative; /* Không áp dụng hiệu ứng mở rộng cho máy tính */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
