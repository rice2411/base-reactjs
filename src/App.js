import React, { useEffect } from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";

import Container from "./components/Layout/Container";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from "./pages/forgotPassword";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/error/404";

import LayoutPage from "./pages/layout";
import UserPage from "./pages/user";

// import "./styles/_reset.scss";
import "./styles/global/_global.css";
import ContainerPage from "./pages/layout/container";
import useAuth from "./hooks/useAuth";
import { ROUTER } from "./constant/router";
import UserPageDetail from "./pages/user/detail";
import { getIsValidToken } from "./utils/auth";

export default function App() {
  const { handleVerifyToken } = useAuth();
  const isValidToken = getIsValidToken();
  useEffect(() => {
    handleVerifyToken();
  }, []);
  return (
    <Routes>
      <Route element={<ContainerPage />}>
        <Route
          path={ROUTER.LOGIN}
          element={
            !isValidToken ? <LoginPage /> : <Navigate to={ROUTER.DASHBOARD} />
          }
        />
        <Route
          path={ROUTER.REGISTER}
          element={
            !isValidToken ? (
              <RegisterPage />
            ) : (
              <Navigate to={ROUTER.DASHBOARD} />
            )
          }
        />
        <Route
          path={ROUTER.FORGOTPASSWORD}
          element={
            !isValidToken ? (
              <ForgotPasswordPage />
            ) : (
              <Navigate to={ROUTER.DASHBOARD} />
            )
          }
        />
      </Route>
      <Route element={<LayoutPage />}>
        <Route path={ROUTER.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTER.SLASH} element={<DashboardPage />} />
        <Route path={ROUTER.USER} element={<UserPage />} />
        <Route path={ROUTER.USER_DETAIL} element={<UserPageDetail />} />
      </Route>
      <Route path={ROUTER.NOT_FOUND} element={<NotFoundPage />} />
      <Route path={ROUTER.ALL} element={<NotFoundPage />} />
    </Routes>
  );
}
