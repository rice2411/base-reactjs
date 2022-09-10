import { ROUTER, ROUTERS } from "../constant/router";

export const isValidRouter = () => {
  const path = window.location.href.split("/");
  const currentRouter = ROUTER.SLASH + path[3];
  return ROUTERS.includes(currentRouter);
};
