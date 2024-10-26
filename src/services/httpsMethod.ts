import { AxiosResponse } from "axios"; // Import AxiosError từ axios
import axiosClientVer2 from "./axiosInterceptors";

// [GET]
const getRequest = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
  const res = await axiosClientVer2.get(url);
  return res.data;
};

// [POST]
const postRequest = async <T>(url: string, payload: unknown): Promise<AxiosResponse<T, any>> => {
  const res = await axiosClientVer2.post(url, payload);
  return res.data;
};

// [PUT]
const putRequest = async <T>(url: string, payload: unknown): Promise<AxiosResponse<T, any>> => {
  const res = await axiosClientVer2.put(url, payload);
  return res.data;
};

// [PATCH]
const patchRequest = async <T>(url: string, payload: unknown): Promise<AxiosResponse<T, any>> => {
  const res = await axiosClientVer2.patch(url, payload);
  return res.data;
};

// Export functions for use elsewhere
export { getRequest, postRequest, putRequest, patchRequest };
