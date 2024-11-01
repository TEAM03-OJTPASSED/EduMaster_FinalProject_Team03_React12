import { AxiosError } from "axios"; // Import AxiosError
import { message } from "antd";
// import { AppDispatch } from "../redux/store/store";
// import {
//   setIsLoginGoogleFailed,
//   setRegisterGoogle,
// } from "../redux/slices/authSlices";
// Định nghĩa kiểu cho response data
interface ErrorResponse {
  message?: string;
  Message?: string;
}

const handleError = (
  error: AxiosError,
  // dispatch: AppDispatch,
  // is_google: boolean
) => {
  // Chỉ định kiểu cho tham số error
  if (error.response) {
    const { status, data } = error.response; // Lấy status và data từ response

    // Kiểm tra kiểu của data
    if (typeof data === "object" && data !== null) {
      const errorData = data as ErrorResponse; // Ép kiểu data thành ErrorResponse
      if (status === 400) {
        message.destroy();
        message.error(
          `${errorData.message || errorData.Message || "Bad Request"}`
        );
     
      }
      if (status === 401) {
        console.log("401 - Lỗi", error);
        message.destroy();
        message.error(`${errorData.message || errorData.Message}`);
      }

      if (status === 403) {
        console.log("403 - Lỗi", errorData);
        message.destroy();
        message.error(`${errorData.message}`);
      }

      if (status === 404) {
        console.log("404 - Not Found", error);
      }

      // Xử lý lỗi 409 (Tạo sổ đọc chỉ số).
      if (status === 409) {
        console.log("409 - Tạo sổ.", error);
        message.destroy();
        message.error(
          `${errorData.message || errorData.Message || "Conflict"}`
        );
      }

      if (status === 500) {
        console.log("500 - Internal Server Error", error);
        message.destroy();
        message.error(
          `${errorData.message || errorData.Message || "Internal Server Error"}`
        );
      }
    } else {
      console.log("Unexpected data format:", data);
    }
  } else {
    console.log("Error:", error.message);
  }
};

export default handleError;
