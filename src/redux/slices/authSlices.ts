import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import axios from "axios";
import { User } from "../../models/UserModel";

interface AuthState {
  token: string | null;
  currentUser: User;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  loading: false,
  currentUser: {} as User,
  token,
  error: null,
  success: false, // for monitoring the registration process.
};

export const login = createAsyncThunk<
  AuthState,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  //
  try {
    const res = await postRequest("/api/auth", {
      email,
      password,
    });
    console.log("token", res.data.token);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Invalid credentials"
      );
    }
    return rejectWithValue("Invalid credentials");
  }
});

export const getCurrentUser = createAsyncThunk<{ rejectValue: string }>(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest("/api/auth");
      console.log("current user", res.data);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Invalid credentials"
        );
      }
      return rejectWithValue("Invalid credentials");
    }
  }
);
// Tạo slice cho auth

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = ""; // Gán lại null cho error
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
      .addCase(getCurrentUser.fulfilled, (state, action ) => {
        state.loading = false; 
        state.currentUser = action.payload as unknown as User
        state.success = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false; 
        state.success = false;
        state.error   = action.payload as string
      })
  },
});

// Xuất actions và reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer; // Xuất reducer, không phải slice
