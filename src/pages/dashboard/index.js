import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { isLogin } from "../../utils/auth";

export default function DashboardPage() {
  useEffect(() => {
    isLogin();
  }, []);
  return <Dashboard></Dashboard>;
}
