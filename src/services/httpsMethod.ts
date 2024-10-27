import { AxiosResponse } from "axios"; // Import AxiosResponse from axios
import axiosClientVer2 from "./axiosInterceptors";
import { ApiResponse } from "../models/ApiReponse.model";

// [GET]
const getRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.get(url);
  return res.data; 
};

// [POST]
const postRequest = async <T>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.post(url, payload);
  return res.data;
};

// [PUT]
const putRequest = async <T>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.put(url, payload);
  return res.data;
};

// [PATCH]
const patchRequest = async <T>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.patch(url, payload);
  return res.data; 
};

const deleteRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res: AxiosResponse<ApiResponse<T>> = await axiosClientVer2.delete(url);
  return res.data; // Ensure the returned data matches ApiResponse<T>
};

// Export functions for use elsewhere
export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
