import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Tạo instance của axios
export const axiosClientVer2 = axios.create({
  baseURL: "https://edumaster-api-dev.vercel.app", // Placeholder
  timeout: 10000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClientVer2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm Authorization header với token, nếu nó tồn tại
    const token = localStorage.getItem("token"); // Hoặc bất kỳ phương pháp nào bạn lưu trữ token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; // Trả về config đã được chỉnh sửa
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClientVer2.interceptors.response.use(
  (response: AxiosResponse) => {
    // Bạn có thể biến đổi phản hồi ở đây nếu cần
    return response;
  },
  (error) => {
    // Xử lý lỗi phản hồi toàn cầu
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized: Token có thể đã hết hạn hoặc không hợp lệ
        console.log("Unauthorized! Redirecting to login...");
        localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
        window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
      } else if (status === 403) {
        // Forbidden: Người dùng không có quyền
        console.error("Access denied! You don't have the required permission.");
      } else if (status === 500) {
        // Lỗi máy chủ nội bộ
        console.error("Server error! Please try again later.");
      }
    }
    // Luôn trả về lỗi cho hàm gọi
    return Promise.reject(error);
  }
);

export default axiosClientVer2;
