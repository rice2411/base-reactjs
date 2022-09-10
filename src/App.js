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
import { ROUTER } from "./constant/router";

export default function App() {
  const { protectedRouter } = useAuth();
  useEffect(() => {
    protectedRouter();
  }, []);
  return (
    <Routes>
      <Route path={ROUTER.LOGIN} element={<LoginPage />} />
      <Route path={ROUTER.REGISTER} element={<RegisterPage />} />
      <Route element={<LayoutPage />}>
        <Route path={ROUTER.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTER.SLASH} element={<DashboardPage />} />
        <Route path={ROUTER.USER} element={<UserPage />} />
      </Route>
      <Route path={ROUTER.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}
