import { AxiosError } from "axios"; // Import AxiosError từ axios
import axiosClientVer2 from "./axiosInterceptors";
import handleError from "./error";

// [GET]
const getRequest = async (url: string): Promise<any> => {
  try {
    const res = await axiosClientVer2.get(url);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// [POST]
const postRequest = async (url: string, payload: any): Promise<any> => {
  try {
    const res = await axiosClientVer2.post(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// [PUT]
const putRequest = async (url: string, payload: any): Promise<any> => {
  try {
    const res = await axiosClientVer2.put(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// [PATCH]
const patchRequest = async (url: string, payload: any): Promise<any> => {
  try {
    const res = await axiosClientVer2.patch(url, payload);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    return handleError(error as AxiosError); // Chuyển đổi kiểu về AxiosError
  }
};

// Xuất các hàm để sử dụng ở nơi khác
export { getRequest, postRequest, putRequest, patchRequest };
