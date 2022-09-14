import React from "react";
import { Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <Routes>
      <Route element={<ContainerPage />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
