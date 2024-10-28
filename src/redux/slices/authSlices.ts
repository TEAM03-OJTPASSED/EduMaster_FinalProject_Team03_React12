import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";
import { message } from "antd";

interface AuthState {
  token: string | null;
  currentUser: User;
  loading: boolean;
  error: string | null;
  success: boolean;
  // verify-token
  verifyToken: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
  resendToken: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
  
}
const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");

const initialState: AuthState = {
  loading: false,
  currentUser: currentUser,
  token: token,
  error: null,
  success: false, // for monitoring the registration process.
  verifyToken: {
    loading: false,
    error: "",
    success: false,
  },
  resendToken: {
    loading: false,
    error: "",
    success: false,
  },
};

// login
export const login = createAsyncThunk<
  AuthState,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }) => {
  const response = await postRequest("/api/auth", { email, password });
  message.success("Login successfully");
  console.log("user token", (response as any).data.token);
  localStorage.setItem("token", (response as any).data.token);
  return response.data as AuthState; // Ensure response matches AuthState
});

// login gg
export const loginWithGoogle = createAsyncThunk<
  AuthState, // Return type (the resolved data)
  string,
  { rejectValue: string } // Configuration for rejected case
>("auth/loginGoogle", async (google_id) => {
  console.log("gg id", google_id);
  const response = await postRequest("/api/auth/google", { google_id:google_id });
  // console.log("gg token",(response as any).data.token);
  // console.log("gg res", response.data.token);
  localStorage.setItem("token", (response as any).data.token);
  return response.data as AuthState; // Ensure response matches AuthState
});


// getCurrent user
export const getCurrentUser = createAsyncThunk("auth/user", async () => {
  const res = await getRequest("/api/auth");
  localStorage.setItem("user", JSON.stringify(res.data));
  console.log("current user", res.data);
  return res.data; // Ensure the data matches the expected type
});

// verify token when check mail

// Tạo slice cho auth
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentUser = action.payload;
      localStorage.removeItem("token");
    },
    verifyTokenPending: (state) => {
      state.verifyToken.loading = true;
    },
    verifyTokenFulFilled: (state) => {
      state.verifyToken.loading = false;
      state.verifyToken.success = true
    },
    verifyTokenRejected: (state) => {
      state.verifyToken.loading = false;
      state.verifyToken.success = false
    },
    resendTokenPending: (state) => {
      state.resendToken.loading = true;
    },
    resendTokenFulFilled: (state) => {
      state.resendToken.loading = false;
      state.resendToken.success = true
    },
    resendTokenRejected: (state) => {
      state.resendToken.loading = false;
      state.resendToken.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Đặt loading thành true khi đang chờ phản hồi
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; // Đặt loading về false khi có phản hồi
        state.token = action.payload as unknown as string;
        state.success = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
        state.success = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload as User
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export const {
  logout,
  verifyTokenFulFilled,
  verifyTokenPending,
  verifyTokenRejected,
  resendTokenFulFilled,
  resendTokenPending,
  resendTokenRejected
} = authSlice.actions;
export default authSlice.reducer; // Xuất reducer, không phải slice
