import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AuthService from "../service/auth";
import {
  getIsValidToken,
  getToken,
  setIsValidToken,
  verifyToken,
} from "../utils/auth";

const PersistLogin = () => {
  let isValidToken = getIsValidToken();

  const location = useLocation();
  const validateToken = async () => {
    verifyToken();
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <>
      {isValidToken ? (
        <Outlet to={location?.pathname ? location?.pathname : "/dashboard"} />
      ) : (
        <Outlet to={"/login"} />
      )}
    </>
  );
};

export default PersistLogin;
