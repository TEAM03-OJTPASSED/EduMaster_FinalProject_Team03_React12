import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import handleError from "./error"

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
    handleError(error)
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
    handleError(error)
    // Luôn trả về lỗi cho hàm gọi
    return Promise.reject(error);
  }
);

export default axiosClientVer2;
