import { message } from "antd";
import USER_API from "../constants/api/user";
import {
  previewProfileFulfilled,
  previewProfilePending,
  previewProfileRejected,
} from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store/store";
import { deleteRequest, postRequest, putRequest } from "./httpsMethod";
import { User } from "../models/UserModel";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { UserSearchParams } from "../models/SearchInfo.model";
const BASE_URL = "/api/users";

const UserService = {
  // Get a list of users with optional search filters
  getUsers(
    params: UserSearchParams
  ): Promise<ApiResponse<APIResponseData<User[]>>> {
    return postRequest(USER_API.GET_USERS, params);
  },
};
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

export const getUser = async (searchParams: any) => {
  try {
    const response = await postRequest(`${BASE_URL}/id`, searchParams);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const createUser = async (searchParams: any): Promise<User> => {
  try {
    const response = await postRequest(`${BASE_URL}/create`, searchParams);
    return response.data as User; // Adjust if your response structure is different
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow to handle at the calling site
  }
};

export const updatedUser = async (userId: string, userData: any) => {
  try {
    const response = await putRequest(`${BASE_URL}/${userId}`, userData);
    if (response && response.success) {
      message.success("User updated successfully");
      return response.data; // Trả về dữ liệu người dùng đã được cập nhật
    } else {
      message.error("Failed to update user"); // Hiển thị thông báo lỗi
      return null; // Trả về null khi không thành công
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    message.error("An error occurred while updating the user."); // Thông báo lỗi chung
    return null; // Đảm bảo trả về null trong trường hợp có lỗi
  }
};

export const changeRole = async (userId: string, role: string) => {
  try {
    const response = await putRequest(`${BASE_URL}/change-role`, {
      user_id: userId,
      role,
    });
    if (response.success) {
      message.success("User updated successfully");
    } else {
      message.error("Failed to update user"); // Hiển thị thông báo lỗi
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const changeStatus = async (userId: string, status: boolean) => {
  try {
    const response = await putRequest(`${BASE_URL}/change-status`, {
      user_id: userId,
      status,
    });
    if (response.success) {
      return true; // Hoặc trả về một giá trị nào đó nếu cần thiết
    } else {
      throw new Error("Failed to change role");
    }
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await deleteRequest(`${BASE_URL}/${userId}`);
    if (response.success) {
      console.log("User deleted successfully");
      message.success("User deleted successfully");
      return true;
    } else {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const previewInstructor = async (
  formData: any,
  dispatch: AppDispatch
) => {
  dispatch(previewProfilePending());
  try {
    const res = await putRequest(USER_API.PREVIEW_INSTRUCTOR, formData);
    console.log("res preview", res.data);
    dispatch(previewProfileFulfilled());
  } catch (error) {
    console.log(error);
    dispatch(previewProfileRejected());
  }
};

export default UserService;
