export const ROUTER = {
  SLASH: "/",
  LOGIN: "/login",
  OAUTH2: "/oauth2/:id",
  REGISTER: "/register",
  FORGOTPASSWORD: "/forgotPassword",
  DASHBOARD: "/dashboard",
  USER: "/user",
  USER_DETAIL: "/user/detail",
  NOT_FOUND: "/notfound",
  ALL: "*",
};

export const ROUTERS = [
  ROUTER.LOGIN,
  ROUTER.REGISTER,
  ROUTER.FORGOTPASSWORD,
  ROUTER.DASHBOARD,
  ROUTER.USER,
  ROUTER.NOT_FOUND,
  ROUTER.SLASH,
  ROUTER.OAUTH2,
];
