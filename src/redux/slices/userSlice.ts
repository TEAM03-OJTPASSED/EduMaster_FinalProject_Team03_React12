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
      state.previewProfile.message = "Preview Successfully";
    },
    previewProfileRejected: (state) => {
      state.previewProfile.loading = false;
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
} = usersSlice.actions;
export default usersSlice.reducer;
