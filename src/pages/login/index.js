import React, { useEffect } from "react";

import Login from "../../components/Login";
import { isLogin } from "../../utils/auth";

const LoginPage = () => {
  useEffect(() => {
    isLogin();
  }, []);
  return <Login></Login>;
};

export default LoginPage;
