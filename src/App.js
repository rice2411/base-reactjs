import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/error/404";
import RequireAuth from "./helper/requireAuth";
import LayoutPage from "./pages/layout";
import UserPage from "./pages/user";
import PersistLogin from "./helper/persistLogin";

// import "./styles/_reset.scss";
import "./styles/global/_global.css";

export default function App() {
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
