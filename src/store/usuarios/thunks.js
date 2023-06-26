import { useSelector } from "react-redux";
import { allUsuarios } from "./usuarioSlice";

import ApiBackend from "../api";
import { bitacora } from "../../models/bitacora";

export const getUsuarios = (usuarios) => {
  return async (dispatch) => {
    try {
      console.log(usuarios);
      const { data } = await ApiBackend.Api.get("/api/usuarios");

      dispatch(allUsuarios(data));
    } catch (catchError) {
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora("error", catchError.message, new Date())
      );
      console.log(catchError);
    }
  };
};

export const PutUsuario = (id, data, usuario, email) => {
  return async (dispatch) => {
    try {
      const resp = await ApiBackend.Api.put(`/api/usuario/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "información",
          `Se editó el usuario: ${email}`,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
      return resp;
    } catch (catchError) {
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "error",
          catchError.message,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
    }
  };
};

export const postUsuario = (data, usuario, email) => {
  console.log(data, usuario);
  return async (dispatch) => {
    try {
      const resp = await ApiBackend.Api.post(`api/crear-cuenta`, data);
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "información",
          `Se generó un nuevo usuario: ${email}`,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
      return resp;
    } catch (catchError) {
      console.log(catchError);
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "error",
          catchError.message,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
    }
  };
};

export const DeleteUsuario = (id, usuario, email) => {
  return async (dispatch) => {
    try {
      const resp = await ApiBackend.Api.delete(`/api/usuario/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "información",
          `Se eliminó el usuario: ${email}`,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
      return resp;
    } catch (catchError) {
      await ApiBackend.Api.post(
        "/api/bitacora",
        new bitacora(
          "error",
          catchError.message,
          new Date().toLocaleString("es-ES", {
            timeZone: "America/Buenos_Aires",
          }),
          usuario
        )
      );
    }
  };
};
