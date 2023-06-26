
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage.js"
export const GuestRoutes = () => {




  return (
    <>
  <Routes>
  <Route path="/" element={<LoginPage />} />
  </Routes>
      
      </>
  );
};
