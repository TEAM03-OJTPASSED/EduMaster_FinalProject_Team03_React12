import { message } from "antd";
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

export const getUser = async (searchParams: any) => {
  try {
    const response = await postRequest(`${BASE_URL}/id`, searchParams);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const updatedUser = async (userId: string, userData: any) => {
  try {
    const response = await putRequest(`${BASE_URL}/${userId}`, userData);

    // Kiểm tra xem response có tồn tại và có thuộc tính success không
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
      return true; // Hoặc trả về một giá trị nào đó nếu cần thiết
    } else {
      throw new Error("Failed to change role");
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
