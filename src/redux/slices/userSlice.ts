import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    error: false,
    message: "",
  },
};

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
      state.forgotPassword.error = false;
      state.forgotPassword.message = "";
    },
    forgotPasswordFulfilled: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = true;
      state.forgotPassword.error = false;
      state.forgotPassword.message = "Password reset email sent successfully";
    },
    forgotPasswordRejected: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = false;
      state.forgotPassword.error = true;
      state.forgotPassword.message =
        "Email does not exist or something went wrong.";
    },
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
