import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { MainRoutes } from "./routes/MainRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";
import ThemeProvider from "./theme";

function App() {
  const status = useCheckAuth();
  const { pathname, search } = useLocation();
  const lastPatch = pathname + search;
  localStorage.setItem("lastPatch", lastPatch);
  return (
    <ThemeProvider>
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<MainRoutes />} />
        ) : (
          <Route path="/*" element={<GuestRoutes />} />
        )}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
