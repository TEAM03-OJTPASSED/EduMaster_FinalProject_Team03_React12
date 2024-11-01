import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";
import { DataInterface } from "../../types/data.type";
import { SearchParamInterface } from "../../types/search.type";

interface initialStateInterface {
  register: {
    loading: boolean;
    success: boolean;
    message: string;
  };
  previewProfile: {
    loading: boolean;
    success: boolean;
    message: string;
  };
  forgotPassword: {
    loading: boolean;
    success: boolean;
    message: string;
  };
  users: {
    loading: boolean;
    success: boolean;
    data: DataInterface<User>;
  };
}

const initialState: initialStateInterface = {
  register: {
    loading: false,
    success: false,
    message: "",
  },
  previewProfile: {
    loading: false,
    success: false,
    message: "",
  },
  forgotPassword: {
    loading: false,
    success: false,
    message: "",
  },
  users: {
    loading: false,
    success: false,
    data: {
      pageData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      },
    },
  },
};
export const getUsersData = createAsyncThunk(
  "user/getAllUser",
  async (searchParam: SearchParamInterface) => {
    const res = await postRequest("admin/users", searchParam);
    return res.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerPending: (state) => {
      state.register.loading = true;
      state.register.success = false;
      state.register.message = "";
    },
    registerFulfilled: (state) => {
      state.register.loading = false;
      state.register.success = true;
      state.register.message = "Register successfully";
    },
    registerRejected: (state) => {
      state.register.loading = false;
    },

    previewProfilePending: (state) => {
      state.previewProfile.loading = true;
      state.previewProfile.success = false;
      state.previewProfile.message = "";
    },
    previewProfileFulfilled: (state) => {
      state.previewProfile.loading = false;
      state.previewProfile.success = true;
      state.previewProfile.message = "Preview successfully";
    },
    previewProfileRejected: (state) => {
      state.previewProfile.loading = false;
    },
    // Forgot password actions
    forgotPasswordPending: (state) => {
      state.forgotPassword.loading = true;
      state.forgotPassword.success = false;
      state.forgotPassword.message = "";
    },
    forgotPasswordFulfilled: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = true;
      state.forgotPassword.message = "Password reset email sent successfully";
    },
    forgotPasswordRejected: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = false;
      state.forgotPassword.message =
        "Email does not exist or something went wrong.";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.success = true;
        state.users.data = action.payload as DataInterface<User>;
      })
      .addCase(getUsersData.rejected, (state) => {
        state.users.loading = false;
        state.users.success = false;
      });
  },
});

export const {
  registerFulfilled,
  registerPending,
  registerRejected,
  previewProfileFulfilled,
  previewProfilePending,
  previewProfileRejected,
  forgotPasswordPending,
  forgotPasswordFulfilled,
  forgotPasswordRejected,
} = usersSlice.actions;

export default usersSlice.reducer;
