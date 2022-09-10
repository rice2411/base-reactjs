import { createContext, useState } from "react";
import cookies from "js-cookie";

import { getToken, setIsValidToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { isValidRouter, validatorRouter } from "../../helper/router";
import { ROUTER } from "../../constant/router";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const logout = async () => {
    cookies.remove("token");
    cookies.remove("isValid");
    navigate("/login", { replace: true });
  };
  const protectedRouter = async () => {
    const currentPath = window.location.href;
    const token = getToken();

    if (currentPath.includes(ROUTER.NOT_FOUND)) {
      console.log(1);
      return;
    }

    let isValidToken = null;

    if (token) {
      isValidToken = await verifyToken();
    }

    if (isValidToken != null) {
      if (currentPath.includes("/login")) {
        navigate((to = "/dashboard"), { replace: true });
        console.log(3);
      }
    } else {
      if (!currentPath.includes("/login")) {
        navigate((to = "/login"));
        console.log(4);
      }
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
      value={{ persist, setPersist, logout, protectedRouter, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
