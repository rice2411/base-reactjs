import React from "react";
import { Outlet } from "react-router-dom";

function Container() {
  return (
      <div id="modal"> <Outlet /> </div>
  );
}

export default Container;
