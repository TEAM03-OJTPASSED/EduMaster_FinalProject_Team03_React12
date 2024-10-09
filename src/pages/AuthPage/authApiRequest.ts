import axios from "axios";
import {
  loginStart,
  loginError,
  loginSuccess,
  registerError,
  registerStart,
  registerSuccess,
  forgotStart,
  forgotError,
  forgotSuccess,
} from "./authSlice";
const URL_BASE_API = "http://localhost:8080";
import { RegisterType } from "./SignUppage";
import { LoginProps } from "./Loginpage";
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
  verifyEmailExisted: async (dispatch:AppDispatch,email: string) => {
    dispatch(forgotStart())
    try {
      const res =  await axios.post(`${URL_BASE_API}/forgot-password`, email)
      const {data} = res
      dispatch(forgotSuccess(data))
    } catch (error) {
      dispatch(forgotError())
      console.log(error);
    }
  },
};

export default authApiRequest;
