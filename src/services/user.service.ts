import USER_API from "../constants/api/user";
import { previewProfileFulfilled, previewProfilePending, previewProfileRejected } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store/store";
import { postRequest, putRequest } from "./httpsMethod";
const BASE_URL = "/api/users"; // Đường dẫn API

// Lấy danh sách người dùng
export const getUsers = async (searchParams: any) => {
  try {
    const response = await postRequest(`${BASE_URL}/search`, searchParams);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const previewInstructor = async (formData : any,dispatch:AppDispatch)=>{
  dispatch(previewProfilePending());
  try {
    const res = await putRequest(USER_API.PREVIEW_INSTRUCTOR, formData);
    console.log("res preview", res.data);
    dispatch(previewProfileFulfilled());
  } catch (error) {
    console.log(error);
    dispatch(previewProfileRejected());
  }
}