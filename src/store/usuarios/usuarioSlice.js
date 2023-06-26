import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuarios: [],
  },
  reducers: {
    allUsuarios: (state, { payload }) => {
      state.usuarios = payload;
    },
    clearUsuarios: (state) => {
      state.usuarios = [];
    },
  },
});

export const { allUsuarios, clearUsuarios } = usuarioSlice.actions;
