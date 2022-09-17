import { createContext, useState } from "react";
import cookies from "js-cookie";

import { getToken, setIsValidToken } from "../../utils/auth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import AuthService from "../../service/auth";

import { ROUTER, ROUTERS } from "../../constant/router";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const location = useLocation();
  const logout = async () => {
    cookies.remove("token");
    cookies.remove("isValid");
    cookies.remove("user");
    navigate(ROUTER.LOGIN, { replace: true });
  };
  const handleVerifyToken = async () => {
    const path = location.pathname;

    if (!ROUTERS.includes(path)) {
      return;
    }
    const token = getToken();
    if (token) {
      let isValidToken = null;
      isValidToken = await verifyToken();
      if (!isValidToken) {
        logout();
      }
    } else {
      logout();
    }
  };
  const verifyToken = async () => {
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

  return (
    <AuthContext.Provider
      value={{ persist, setPersist, logout, handleVerifyToken, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
