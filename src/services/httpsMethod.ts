import { AxiosError, AxiosResponse } from "axios"; // Import AxiosError từ axios
import axiosClientVer2 from "./axiosInterceptors";
import handleError from "./error";

// [GET]
const getRequest = async <T>(url:string):Promise<AxiosResponse<T, any>> => {
    const res = await axiosClientVer2.get(url);
    return res.data
};

// [POST]
const postRequest = async <T>(url:string,payload: any):Promise<AxiosResponse<T, any>> => {
  const res = await axiosClientVer2.post(url,payload);
  return res.data
};

// [PUT]
const putRequest = async (url: string, payload: unknown): Promise<unknown> => {
  try {
    const res = await axiosClientVer2.put(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// [PATCH]
const patchRequest = async (url: string, payload: unknown): Promise<unknown> => {
  try {
    const res = await axiosClientVer2.patch(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// Xuất các hàm để sử dụng ở nơi khác
export { getRequest, postRequest, putRequest, patchRequest };
