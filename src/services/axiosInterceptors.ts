import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import handleError from "./error";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  setIsLoginGoogleFailed,
  setRegisterGoogle,
} from "../redux/slices/authSlices";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store/store";

// Tạo instance của axios
export const axiosClientVer2 = axios.create({
  baseURL: "https://edumaster-api-dev.vercel.app",
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
  (error: AxiosError) => {
    // Xử lý lỗi request
    handleError(error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClientVer2.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý thành công response, nếu cần
    return response;
  },
  (error: AxiosError) => {
    // Xử lý lỗi phản hồi toàn cầu
    handleError(error);
    const dispatch = useDispatch<AppDispatch>();
    const { is_google } = useSelector((state: RootState) => state.auth.login);
    if (is_google && error.response?.data) {
      dispatch(setIsLoginGoogleFailed());
      dispatch(setRegisterGoogle(true));
    }
    // Luôn trả về lỗi cho hàm gọi
    return Promise.reject(error);
  }
);

export default axiosClientVer2;
