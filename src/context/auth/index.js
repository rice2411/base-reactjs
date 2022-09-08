import { createContext, useState } from "react";
import cookies from "js-cookie";

import { getToken, setIsValidToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
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
  const isLogin = async () => {
    const token = getToken();
    let isValidToken = null;
    const currentPath = window.location.href;

    if (token) {
      isValidToken = await verifyToken();
    }
    console.log(currentPath);
    console.log(isValidToken);
    console.log(currentPath.split("/"));
    if (isValidToken != null) {
      if (currentPath.includes("/login"))
        navigate("/dashboard", { replace: true });
    } else {
      if (currentPath.split("/")[1] || !currentPath.split("/")[1])
        navigate("/login", { replace: true });
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
      value={{ persist, setPersist, logout, isLogin, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
