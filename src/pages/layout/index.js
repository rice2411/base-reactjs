import React from "react";
import { Outlet } from "react-router-dom";

import Layout from "../../components/Layout";
import useMode from "../../hooks/useMode";

export default function LayoutPage() {
  const { mode } = useMode();

  return (
    <>
      <div className={` ${mode ? `bg-white` : `bg-dark`} `}>
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
}
