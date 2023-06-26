import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    token: null,
    user: null,
    registerUser: null,
    authErrorMessage: null,
    authStatus: "pending",
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.token = payload.token;
      state.user = payload.user;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.token = null;
      state.user = null;
      state.registerUser = null;
      state.authErrorMessage = null;
      state.authStatus = "pending";
    },
    loginError: (state, { payload }) => {
      state.authErrorMessage = payload.errorMessage;
    },
    register: (state, { payload }) => {
      state.registerUser = payload ? payload : null;
    },
    errorSet: (state, { payload }) => {
      state.authErrorMessage = payload ? payload.error : null;
      state.authStatus = payload ? payload.status : "pending";
    },
  },
});

export const { login, logout, loginError, register, errorSet } =
  authSlice.actions;
