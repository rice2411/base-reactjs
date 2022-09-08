import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Layout from "../../components/Layout";
import useAuth from "../../hooks/useAuth";
import useMode from "../../hooks/useMode";

export default function LayoutPage() {
  const { initMode } = useMode();

  useEffect(() => {
    initMode();
  }, []);
  return (
    <>
      <div className={`bg-white dark:bg-gray-900 `}>
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
}
