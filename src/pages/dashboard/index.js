import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import useAuth from "../../hooks/useAuth";

export default function DashboardPage() {
  const { isLogin } = useAuth();
  useEffect(() => {
    isLogin();
  }, []);
  return <Dashboard></Dashboard>;
}
