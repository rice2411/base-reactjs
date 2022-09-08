import React, { useEffect } from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/error/404";

import LayoutPage from "./pages/layout";
import UserPage from "./pages/user";

// import "./styles/_reset.scss";
import "./styles/global/_global.css";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { isLogin } = useAuth();
  useEffect(() => {
    isLogin();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<LayoutPage />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
