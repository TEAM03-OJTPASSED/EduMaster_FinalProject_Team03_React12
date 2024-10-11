import { createSlice } from "@reduxjs/toolkit";

// 
type UserType = {
  username: string;
//   password: string;
  email: string;
  accessToken:string
};

interface AuthType {
  login: {
    isAuthenticated?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    currentUser?: UserType;
  };
  register: {
    isFetching?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
  };
}
const initialState: AuthType = {
  login: {
    isAuthenticated: false,
    currentUser: {} as UserType,
    isFetching: false,
    isError: false,
  },
  register: {
    isFetching: false,
    isError: false,
    isSuccess: true,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isAuthenticated = true;
    },
    loginError: (state) => {
      state.login.isError = true;
      state.login.isFetching = false;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
     
      state.register.isSuccess = true;
    },
    registerError: (state) => {
      state.register.isError = true;
      state.register.isFetching = false;
    },
  },
});

export default authSlice.reducer;
export const {registerStart,registerSuccess,registerError,loginStart, loginSuccess, loginError } = authSlice.actions;
