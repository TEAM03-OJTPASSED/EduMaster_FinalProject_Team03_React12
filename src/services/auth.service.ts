import { RegisterType } from "../pages/AuthPage/SignUpPage";
import { AppDispatch } from "../redux/store/store";

import {
  forgotPasswordFulfilled,
  forgotPasswordPending,
  forgotPasswordRejected,
  registerFulfilled,
  registerPending,
  registerRejected,
} from "../redux/slices/userSlice";
import { postRequest, putRequest } from "./httpsMethod";
import {
  resendTokenFulFilled,
  resendTokenPending,
  resendTokenRejected,
  verifyTokenFulFilled,
  verifyTokenPending,
  verifyTokenRejected,
} from "../redux/slices/authSlices";

export const register = async (
  formData: RegisterType,
  dispatch: AppDispatch
) => {
  dispatch(registerPending());
  try {
    const res = await postRequest("/api/users", formData);
    console.log("res", res.data);
    dispatch(registerFulfilled());
  } catch (error) {
    console.log(error);
    dispatch(registerRejected());
  }
};

export const verifyTokenEmail = async (
  verification_id: string,
  dispatch: AppDispatch
) => {
  dispatch(verifyTokenPending());
  try {
    const res = await postRequest("/api/auth/verify-token", {
      token: verification_id,
    });
    console.log("res", res.data);
    dispatch(verifyTokenFulFilled());
  } catch (error) {
    console.log(error);
    dispatch(verifyTokenRejected());
  }
};

export const resendTokenEmail = async (email: string, dispatch: AppDispatch) => {
  dispatch(resendTokenPending());
  try {
    const res  = await postRequest("/api/auth/resend-token",{email:email})
    console.log("resend res", res.data);
    
    dispatch(resendTokenFulFilled());
  } catch (error) {
    console.log(error);
    dispatch(resendTokenRejected());
  }
};

export const forgotPassword = async (email: string, dispatch: AppDispatch) => {
  dispatch(forgotPasswordPending()); 
  try {
    const res = await putRequest("/api/auth/forgot-password", { email: email }); 
    console.log("Response data:", res.data);
    dispatch(forgotPasswordFulfilled()); 
  } catch (error) {
    console.error("Error:", error);
    dispatch(forgotPasswordRejected());
  }
};