import React from "react";
import { Outlet } from "react-router-dom";

function Container() {
  return (
    <div>
      <div id="modal"></div>
      {/* <> */}

      <Outlet />
    </div>
  );
}

export default Container;
