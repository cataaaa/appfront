import { logout, login, loginError, register, errorSet } from "./authSlice";
import * as _ from "lodash";
import qs from "qs";

import ApiBackend from "../api";

export const startLogin = (dataSend) => {
  return async (dispatch) => {
    try {
      dispatch(logout());
      let mail = dataSend.email;
      dataSend.grant_type = "password";
      dataSend = qs.stringify(dataSend);
      const { data } = await ApiBackend.Api.post(
        "/api/iniciar-sesion",
        dataSend
      );
      let response;
      let payload;
      if (mail !== "admin") {
        response = await ApiBackend.Api.get("/api/usuarios", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        payload = {
          token: data.token,
          user: {
            user: data.user,
            nombre: data.nombre,
            apellido: data.apellido,
            iniciales: data.iniciales,
            roles: data.roles,
            id: data.id,
          },
        };
      } else {
        payload = {
          token: data.token,
          user: {
            name: "admin",
            mail: "admin",
            idVendedor: "ADM",
            rol: "Admin",
          },
        };
      }
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      dispatch(login(payload));
    } catch (catchError) {
      // console.log(catchError);
      if (_.isUndefined(catchError.response)) {
        return dispatch(errorSet({ status: "error", error: "Error Server" }));
      }
      const err = catchError.response.data;
      if (_.isUndefined(err)) {
        return dispatch(
          errorSet({ status: "error", error: catchError.message })
        );
      }
      return dispatch(
        errorSet({ status: "error", error: catchError.response.data.mensaje })
        //loginError({ errorMessage: err.error_description })
      );
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  };
};

export const setRegister = (data = null) => {
  return async (dispatch) => {
    if (!data) {
      dispatch(register());
      return;
    }
    const payload = data;
    dispatch(register(payload));
  };
};

export const createUserPerson = (data) => {
  return async (dispatch) => {
    try {
      dispatch(errorSet());
      await ApiBackend.Api.post("/register-people", data);
      dispatch(errorSet({ status: "saved" }));
    } catch (catchError) {
      if (_.isUndefined(catchError.response)) {
        return dispatch(errorSet({ status: "error", error: "Error Server" }));
      }
      const err = catchError.response.data;
      if (_.isUndefined(err)) {
        return dispatch(
          errorSet({ status: "error", error: catchError.message })
        );
      }
      return dispatch(errorSet({ status: "error", error: err.msg }));
    }
  };
};

export const createUserCompany = (dataSend) => {
  return async (dispatch) => {
    try {
      dispatch(errorSet());
      if (!dataSend) return;
      let formData = new FormData();
      formData.append("com_id", dataSend.com_id);
      formData.append("com_responsable", dataSend.com_responsable);
      formData.append("com_run", dataSend.com_run);
      formData.append("com_razon", dataSend.com_razon);
      formData.append("com_rut", dataSend.com_rut);
      formData.append("com_giro", dataSend.com_giro);
      formData.append("com_email", dataSend.com_email);
      formData.append("com_phone", dataSend.com_phone);
      formData.append("com_direccion", dataSend.com_direccion);
      formData.append("com_image", dataSend.com_image);
      formData.append("com_company", dataSend.com_company);
      formData.append("usu_id", dataSend.usu_id);
      formData.append("email", dataSend.usu_email);
      formData.append("password", dataSend.usu_password);
      formData.append("usu_type", dataSend.usu_type);

      await ApiBackend.ApiFiles.post("/register-company", formData);
      dispatch(errorSet({ status: "saved" }));
    } catch (catchError) {
      if (_.isUndefined(catchError.response)) {
        return dispatch(errorSet({ status: "error", error: "Error Server" }));
      }
      const err = catchError.response.data;
      if (_.isUndefined(err)) {
        return dispatch(
          errorSet({ status: "error", error: catchError.message })
        );
      }
      return dispatch(errorSet({ status: "error", error: err.msg }));
    }
  };
};

export const setInicialice = (data) => {
  return async (dispatch) => {
    dispatch(errorSet());
  };
};
