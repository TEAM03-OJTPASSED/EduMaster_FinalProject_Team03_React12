import { AxiosError, AxiosResponse } from "axios"; // Import AxiosError từ axios
import axiosClientVer2 from "./axiosInterceptors";
import handleError from "./error";

// Định nghĩa enum cho các mã trạng thái HTTP
export enum HttpsStatus {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
}

// [GET]
const getRequest = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
  return await axiosClientVer2.get<T>(url);
};

// [POST]
const postRequest = async <T>(url: string, payload: any): Promise<T | void> => {
  const res = await axiosClientVer2.post<T>(url, payload);
  return res.data; // Trả về dữ liệu từ response
};

// [PUT]
const putRequest = async <T>(url: string, payload: any): Promise<T | void> => {
  try {
    const res = await axiosClientVer2.put<T>(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError và xử lý lỗi
  }
};

// [PATCH]
const patchRequest = async <T>(
  url: string,
  payload: any
): Promise<T | void> => {
  try {
    const res = await axiosClientVer2.patch<T>(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError và xử lý lỗi
  }
};

// Xuất các hàm để sử dụng ở nơi khác
export { getRequest, postRequest, putRequest, patchRequest };
