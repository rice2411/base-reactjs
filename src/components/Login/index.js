import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthService from "../../service/auth";
import UserService from "../../service/user";
import { setIsValidToken, setToken, setUser } from "../../utils/auth";
import { loginSchema } from "./loginSchema";
import "./styles.scss";
export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();

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
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/images/logo.png"
              alt="React"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to={"/register"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign up here
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
                      User Name
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="User name"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
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
                    <a
                      href="12"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
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
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
