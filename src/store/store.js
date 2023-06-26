import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usuarioSlice } from "./usuarios/usuarioSlice";

const initialState = {
  sidebarShow: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // bitacora: bitacoraSlice.reducer,
    usuario: usuarioSlice.reducer,
    changeState,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
