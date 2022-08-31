import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../../components/Layout/Footer";
import Navbar from "../../components/Layout/Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* <> */}
      <Navbar />

      <div className=" mx-auto max-w-7xl flex-1 w-full">
        {/* <div className=" mx-auto max-w-7xl"> */}
        <Outlet />
      </div>

      <Footer />
      {/* </> */}
    </div>
  );
}

export default Layout;
