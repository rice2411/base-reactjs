import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/error/404";
import RequireAuth from "./helper/requireAuth";
import LayoutPage from "./pages/layout";
import UserPage from "./pages/user";

import "./styles/_reset.scss";
import "./styles/global/_global.css";
import PersistLogin from "./helper/persistLogin";

export default function App() {
  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PersistLogin />}>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>{" "}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
