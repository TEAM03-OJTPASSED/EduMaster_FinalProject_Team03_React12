import axios from "axios";
import {
  loginStart,
  loginError,
  loginSuccess,
  registerError,
  registerStart,
  registerSuccess,
} from "./authSlice";
const URL_BASE_API = "http://localhost:8080";
import { RegisterType } from "./SignUpPage";
import { LoginProps } from "./LoginPage";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../stores/store";
const authApiRequest = {
  login: async (
    dispatch: AppDispatch,
    naviagte: NavigateFunction,
    formData: LoginProps
  ) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${URL_BASE_API}/login`, formData);
      const { data } = res;
      dispatch(loginSuccess(data));
      naviagte("/");
    } catch (error) {
      console.log(error);
      dispatch(loginError());
    }
  },
  register: async (
    dispatch: AppDispatch,
    naviagte: NavigateFunction,
    formData: RegisterType
  ) => {
    dispatch(registerStart());
    try {
      const res = await axios.post(`${URL_BASE_API}/login`, formData);
      const { data } = res;
      dispatch(registerSuccess(data));
      naviagte("/login");
    } catch (error) {
      console.log(error);
      dispatch(registerError());
    }
  },
};

export default authApiRequest