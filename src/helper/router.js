import { ROUTER, ROUTERS } from "../constant/router";

export const isValidRouter = () => {
  const path = window.location.href.split("/");
  const currentRouter = "/" + path[3];
  console.log(currentRouter);
  return ROUTERS.includes(currentRouter);
};
