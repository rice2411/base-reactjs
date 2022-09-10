import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import useAuth from "../../hooks/useAuth";

export default function DashboardPage() {
  const { protectedRouter } = useAuth();
  useEffect(() => {
    protectedRouter();
  }, []);
  return <Dashboard></Dashboard>;
}
