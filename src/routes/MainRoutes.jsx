import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../components/dashboard"
import DashboardPage from "../pages/dashboard/DashboardPage"
import UsuariosPage from "../pages/admin/UsuarioPage"
import DashboardLayout from "../components/dashboard/DashboardLayout";
import AdminPage from "../pages/admin/AdminPage";
import BitacoraPage from "../pages/admin/BitacoraPage";
import UsuarioNuevoPage from "../pages/admin/UsuarioNuevoPage";
import SinPermisoPage from "../pages/SinPermisoPage";
import { useSelector } from "react-redux";
import ColdecamPage from "../pages/coldecam/ColdecamPage";
import NuevoIngresoPage from "../pages/coldecam/NuevoIngresoPage";


export const MainRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.user.roles;
  return (
    <>
    {/* <DashboardLayout /> */}
  <Routes>
  <Route path="/" element={<DashboardLayout />} >
  {roles?.find((rol) =>rol.descripcion == ("admin")) ?  <Route path="/admin" element={<AdminPage />} /> : <Route path="/denegado" element={<SinPermisoPage />} />}
  {roles?.find((rol) =>rol.descripcion == ("admin")) ? <Route path="/usuarios" element={<UsuariosPage />} /> : <Route path="/denegado" element={<SinPermisoPage />} />}
  {roles?.find((rol) =>rol.descripcion == ("admin")) ? <Route path="/bitacora" element={<BitacoraPage />} /> : null}
  {roles?.find((rol) =>rol.descripcion == ("admin")) ? <Route path="/usuario/nuevo" element={<UsuarioNuevoPage />} /> : null}
  {roles?.find((rol) =>rol.descripcion == ("admin","viajes")) ? <Route path="/dashboard/app" element={<DashboardPage />} /> : null}
  {roles?.find((rol) =>rol.descripcion == ("admin","coldecam")) ? <Route path="/coldecam" element={<ColdecamPage />} /> : null}
  {roles?.find((rol) =>rol.descripcion == ("admin","coldecam")) ? <Route path="/coldecam/nuevoingreso" element={<NuevoIngresoPage />} /> : null}
  
    </Route> 
  {/* <Route path="/*" element={<Dashboard />} /> */}
  
  </Routes>
    </>
  );
};
