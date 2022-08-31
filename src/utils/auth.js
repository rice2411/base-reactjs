import cookies from "js-cookie";
import AuthService from "../service/auth";

export function setToken(token) {
  cookies.set("token", token);
  return token;
}
export function getToken() {
  if (typeof cookies.get("token") !== "undefined") {
    return cookies.get("token");
  }
  return "";
}

export function setIsValidToken(value) {
  cookies.set("isValid", value);
  return value;
}
export function getIsValidToken() {
  if (typeof cookies.get("isValid") !== "undefined") {
    return JSON.parse(cookies.get("isValid"));
  }
  return "";
}

export function setUser(user) {
  cookies.set("user", JSON.stringify(user));
  return user;
}
export function getUser() {
  if (typeof cookies.get("user") !== "undefined") {
    return JSON.parse(cookies.get("user"));
  }
  return "";
}
export const logout = async () => {
  cookies.remove("token");
  cookies.remove("isValid");
  window.location.href = "/login";
};
export const isLogin = async () => {
  const token = getToken();
  let isValidToken = null;
  const currentPath = window.location.href;
  if (token) {
    isValidToken = await verifyToken();
  }
  if (isValidToken != null) {
    if (currentPath.includes("/login")) window.location.href = "/dashboard";
  } else {
    if (!currentPath.includes("/login")) window.location.href = "/login";
  }
};
export const verifyToken = async () => {
  const token = getToken();
  try {
    await AuthService.verify();
    setIsValidToken(true);
    return token;
  } catch (err) {
    setIsValidToken(false);
    console.log(err.message);
    return null;
  }
};
