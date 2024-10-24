import { RegisterType } from "../pages/AuthPage/SignUpPage";
import { AppDispatch } from "../redux/store/store";

import {
  registerFulfilled,
  registerPending,
  registerRejected,
} from "../redux/slices/userSlice";
import { postRequest } from "./httpsMethod";

export const register = async (
  formData: RegisterType,
  dispatch: AppDispatch
) => {
  dispatch(registerPending());
  try {
    const res = await postRequest("api/users", formData);
    console.log("res",res.data);
    
    dispatch(registerFulfilled());
  } catch (error) {
    console.log(error);
    dispatch(registerRejected());
  }
};
