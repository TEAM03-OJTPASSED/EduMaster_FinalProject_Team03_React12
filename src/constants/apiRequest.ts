import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { jwtDecode } from "jwt-decode";
import { AppDispatch } from "../stores/store";

interface User {
  access_token: string;
}

interface RefreshTokenResponse {
  access_token: string;
}

const refreshToken = async (): Promise<RefreshTokenResponse | null> => {
  try {
    const res = await axios.post<RefreshTokenResponse>(
      "http://localhost:8000/api/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error refreshing token", error);
    return null;
  }
};

export const createAxios = (
  user: User,
  dispatch: AppDispatch,
  stateSuccess: (user: User) => any
  //   stateErrors: (error : AxiosError) => any
): AxiosInstance => {
  const axiosJWT = axios.create();

  // Request interceptor
  axiosJWT.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const date = new Date();
      const decodedToken = jwtDecode(user?.access_token);
      if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        if (data) {
          const refreshUser = {
            ...user,
            access_token: data.access_token,
          };
          dispatch(stateSuccess(refreshUser));
          if (config.headers) {
            config.headers["Authorization"] = `Bearer ${data.access_token}`;
          }
        }
      } else {
        if (config.headers) {
          config.headers["Authorization"] = `Bearer ${user.access_token}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosJWT.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const errorStatus = error.response?.status || 500;
      switch (errorStatus) {
        case 400:
          return Promise.reject(errorStatus);
        case 401:
          return Promise.reject(errorStatus);
        case 403:
          return Promise.reject(errorStatus);
        case 404:
          return Promise.reject(errorStatus);
        case 409:
          return Promise.reject(errorStatus);
        // default :500
        default:
          return Promise.reject(errorStatus);
      }
    }
  );

  return axiosJWT;
};
