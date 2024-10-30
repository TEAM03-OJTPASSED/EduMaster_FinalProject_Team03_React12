import { message } from "antd";
import USER_API from "../constants/api/user";
import {
  previewProfileFulfilled,
  previewProfilePending,
  previewProfileRejected,
} from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store/store";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./httpsMethod";
import {
  ChangeUserRoleParams,
  ChangeUserStatusParams,
  User,
} from "../models/UserModel";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { UserSearchParams } from "../models/SearchInfo.model";
const BASE_URL = "/api/users";

export const UserService = {
  // Get a list of users with optional search filters
  getUsers(
    params: UserSearchParams
  ): Promise<ApiResponse<APIResponseData<User[]>>> {
    return postRequest(USER_API.GET_USERS, params);
  },
  getUser(userId: string): Promise<ApiResponse<APIResponseData<User[]>>> {
    return getRequest(USER_API.GET_USER(userId));
  },
  createUser(param: User): Promise<ApiResponse<User>> {
    return postRequest(USER_API.CREATE_USER, param);
  },
  updateUser(userId: string, param: User): Promise<ApiResponse<User>> {
    return putRequest<User>(USER_API.UPDATE_USER(userId), param)
      .then((response) => {
        message.success("User updated successfully!");
        return response;
      })
      .catch((error) => {
        message.error("Failed to update user.");
        throw error;
      });
  },
  deleteUser(userId: string): Promise<ApiResponse<User>> {
    return deleteRequest<User>(USER_API.DELETE_USER(userId))
      .then((response) => {
        message.success("User deleted successfully!");
        return response;
      })
      .catch((error) => {
        message.error("Failed to delete user.");
        throw error;
      });
  },
  changeRole(params: ChangeUserRoleParams): Promise<ApiResponse<User>> {
    return putRequest<User>(USER_API.CHANGE_ROLE, params)
      .then((response) => {
        message.success("User role changed successfully!");
        return response;
      })
      .catch((error) => {
        message.error("Failed to change user role.");
        throw error;
      });
  },

  changeStatus(params: ChangeUserStatusParams): Promise<ApiResponse<User>> {
    return putRequest(USER_API.CHANGE_STATUS, params)
      .then((response) => {
        message.success("Status updated successfully!");
        return response as ApiResponse<User>;
      })
      .catch((error) => {
        message.error("Failed to update status.");
        throw error;
      });
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
