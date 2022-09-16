import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import AuthService from "../../../service/auth";
import UserService from "../../../service/user";
import ButtonIcon from "../../../shared/Button/Icon";
import { setIsValidToken, setToken, setUser } from "../../../utils/auth";
import {
  handleHiddenScrollBar,
  handleOpenScrollBar,
} from "../../../utils/scrollbar";
import { loginSchema } from "./loginSchema";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import "./styles.scss";
import useLoading from "../../../hooks/useLoading";
import OAuth2Service from "../../../service/oauth2";
export default function Login() {
  const { persist, setPersist } = useAuth();
  const { handleShowLoader, handleHiddenLoader } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const handleSubmit = async (values) => {
    const params = {
      username: values.username,
      password: values.password,
    };
    handleShowLoader();
    try {
      const response = await AuthService.login(params);

      const { token } = response?.data?.data;

      setToken(token);
      setIsValidToken(true);

      const userResponse = await UserService.getMe();
      if (userResponse?.data?.data) {
        setUser(userResponse?.data?.data);
      }

      setUserName("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Hệ thống lỗi!!");
      }
      errRef.current.focus();
    } finally {
      handleHiddenLoader();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const handleGoogleLogin = () => {
    const win = window.open(
      OAuth2Service.google(),
      "Oauth2",
      "height=600,width=600"
    );
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  };
  const handleFacebookLogin = () => {
    const win = window.open(
      OAuth2Service.facebook(),
      "Oauth2",
      "height=600,width=600"
    );
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  };
  const handleGitHubLogin = () => {
    const win = window.open(
      OAuth2Service.github(),
      "Oauth2",
      "height=600,width=600"
    );
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
    document.documentElement.classList.add("bg-gray-50");
    handleHiddenScrollBar();
    return () => {
      document.documentElement.classList.remove("bg-gray-50");
      handleOpenScrollBar();
    };
  }, [persist]);

  return (
    <div className="flex justify-center  mt-12">
      <div className=" py-12 px-4 sm:px-6 lg:px-8 shadow  w-1/3">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            hoặc{" "}
            <Link
              to={"/register"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema()}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue, handleChange }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Tên đăng nhập
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Tên đăng nhập"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Mật khẩu
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p
                ref={errRef}
                className={`text-center ${
                  touched.username || touched.password || errMsg
                    ? "errmsg"
                    : "offscreen"
                }`}
                aria-live="assertive"
              >
                {(touched.username && errors.username) ||
                  (touched.password && errors.password) ||
                  errMsg}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    onChange={togglePersist}
                    checked={persist}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to={"/forgotpassword"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  id="test"
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Đăng nhập
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className=" flex justify-center items-center">
          <hr className="my-8 h-px bg-gray-200 border-0  w-1/2" />
          <span className="text-gray-300 px-7">Hoặc</span>
          <hr className="my-8 h-px bg-gray-200 border-0  w-1/2" />
        </div>

        <ButtonIcon
          text={"Đăng nhập với Google"}
          buttonClass="w-auto"
          id="google"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
        </ButtonIcon>
        <ButtonIcon
          text={"Đăng nhập với Facebook"}
          buttonClass="w-auto mt-2"
          id="facebook"
          onClick={handleFacebookLogin}
        >
          <BsFacebook className="text-sky-500" />
        </ButtonIcon>
        <ButtonIcon
          text={"Đăng nhập với GitHub"}
          buttonClass="w-auto mt-2"
          id="github"
          onClick={handleGitHubLogin}
        >
          <FaGithub />
        </ButtonIcon>
      </div>
    </div>
  );
}
