import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";

interface AuthState {
  token: string | null;
  currentUser: User;
  loading: boolean;
  error: string | null;
  success: boolean;
}
const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: AuthState = {
  loading: false,
  currentUser: currentUser,
  token: token,
  error: null,
  success: false, // for monitoring the registration process.
};



export const login = createAsyncThunk<
  AuthState, // Return type (the resolved data)
  { email: string; password: string }, // Parameters passed to the thunk
  { rejectValue: string } // Configuration for rejected case
>(
  "auth/login",
  async ({ email, password }) => {
      const response = await postRequest("api/auth", { email, password });
      console.log(typeof(response.data))
      localStorage.setItem("token", JSON.stringify(response.data.token) );
      return response.data as AuthState; // Ensure response matches AuthState

  }
);

// export const logout = createAsyncThunk<{ rejectValue: string }>("auth/logout", async (_, { rejectWithValue }) => {
//   //
//   try {
//     const res = await getRequest("/api/auth/log-out");
//     localStorage.removeItem("token");
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return rejectWithValue(
//         error.response.data.message || "Invalid credentials"
//       );
//     }
//     return rejectWithValue("Invalid credentials");
//   }
// });

export const getCurrentUser = createAsyncThunk<
  AuthState, // Resolved type (the returned user data)
  void, // No arguments passed to the thunk
  { rejectValue: string } // Rejected value type
>(
  "auth/user",
  async () => {
      const res = await getRequest("/api/auth");
      localStorage.setItem("user", JSON.stringify(res.data)  );

      console.log("current user", res.data);
      return res.data as AuthState; // Ensure the data matches the expected type
  
  }
);
// Tạo slice cho auth

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   logout : (state, action)=>{
      state.currentUser = action.payload
      localStorage.removeItem("token")
   }
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
      // .addCase(logout.pending, (state) => {
      //   state.loading = true; 
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.loading = false; 
      //   state.success = true;
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.loading = false; 
      //   state.success = false;
      //   state.error   = action.payload as string
      // })
  },
});

// Xuất actions và reducer
export const {logout} = authSlice.actions
export default authSlice.reducer; // Xuất reducer, không phải slice
