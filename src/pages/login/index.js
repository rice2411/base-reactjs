import React, { useEffect } from "react";

import Login from "../../components/Login";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { isLogin } = useAuth();
  useEffect(() => {
    isLogin();
  }, []);
  return <Login></Login>;
};

export default LoginPage;
