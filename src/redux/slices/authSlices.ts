import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../services/httpsMethod";
import axios from "axios";

interface Data {
  success: boolean;
  data: { token: string };
}

// Khởi tạo state ban đầu
interface AuthState {
  data: Data | null; // Thay đổi kiểu để cho phép null
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: null, // Khởi tạo data là null
  loading: false,
  error: null, // Đặt lỗi ban đầu là null
};

// Định nghĩa async thunk cho login
export const login = createAsyncThunk<
  Data, // Trả về kiểu Data
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Gọi hàm postRequest để thực hiện đăng nhập
    const res = await postRequest("/api/auth", {
      email,
      password,
    });
    return res.data; // Giả định rằng response chứa dữ liệu người dùng
  } catch (error: unknown) {
    // Xác định kiểu cho error
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Invalid credentials"
      );
    }
    return rejectWithValue("Invalid credentials");
  }
});

// Tạo slice cho auth
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null; // Gán lại null cho data khi logout
      state.error = null; // Gán lại null cho error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Đặt loading thành true khi đang chờ phản hồi
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; // Đặt loading về false khi có phản hồi
        state.error = null; // Đặt lỗi về null khi đăng nhập thành công
        state.data = action.payload; // Gán payload vào state.data
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; // Đặt loading về false khi có lỗi
        state.error = action.payload || "Login failed"; // Đặt thông điệp lỗi
      });
  },
});

// Xuất actions và reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer; // Xuất reducer, không phải slice
