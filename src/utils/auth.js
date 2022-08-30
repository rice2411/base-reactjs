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
  cookies.set("user", user);
  return user;
}
export function getUser() {
  if (typeof cookies.get("user") !== "undefined") {
    return JSON.parse(cookies.get("user"));
  }
  return "";
}

export const isLogin = async () => {
  const token = getToken();
  if (token) {
    verifyToken(token);
  }

  const isValidToken = getIsValidToken();
  const currentPath = window.location.href;
  console.log(isValidToken);
  if (isValidToken) {
    if (currentPath.includes("/login")) window.location.href = "/dashboard";
  } else {
    if (!currentPath.includes("/login")) window.location.href = "/login";
  }
};

export const verifyToken = async () => {
  const token = getToken();
  let param = { token: token };
  try {
    await AuthService.verify(param);
    setIsValidToken(true);
    return token;
  } catch (err) {
    setIsValidToken(false);
    console.log(err);
    return null;
  }
};
