import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/error/404";

import LayoutPage from "./pages/layout";
import UserPage from "./pages/user";

// import "./styles/_reset.scss";
import "./styles/global/_global.css";

export default function App() {
  return (
    <Routes basename="/dasboard">
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LayoutPage />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
