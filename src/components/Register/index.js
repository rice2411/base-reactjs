import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { setIsValidToken, setToken, setUser } from "../../utils/auth";
import AuthService from "../../service/auth";
import UserService from "../../service/user";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errMsg, setErrMsg] = useState("");
  const [checkSubmit, setCheckSubmit] = useState(false);

  const userRef = useRef();
  const pwdRef = useRef();
  const checkRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Tên người dùng phải dài hơn 3 ký tự!!")
        .max(25, "Tên người dùng Không dài quá 25 ký tự!!"),
      password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!!"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu xác nhận không đúng!!")
    }),
    onSubmit: async (values) => {
      if(formik.errors.username) userRef.current.focus();        
      if(formik.errors.password || formik.errors.confirmPassword) pwdRef.current.focus();        

      if (checkSubmit){
        const params = {
          username: values.username,
          password: values.password,
        };

        try {
          const response = await AuthService.register(params);

          const res = await AuthService.login(params);

          const { token } = res?.data?.data;

          setToken(token);
          setIsValidToken(true);
          console.log(res?.data?.data);
          const userResponse = await UserService.getMe();
          if (userResponse?.data?.data) {
            setUser(userResponse?.data?.data);
          }

          navigate(from, { replace: true });
        } catch (err) {
          if (err?.response) {
            setErrMsg(err.response.data.message);
            userRef.current.focus();
          }
        }
      }else{
        checkRef.current.focus();
      }
    }
  });

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User name
                  </label>
                  {formik.errors.username && formik.touched.username && (
                    <p
                      className={`mb-2 ml-2 text-sm font-light text-red-500`}
                      aria-live="assertive"
                    >
                      {formik.errors.username}
                    </p>
                  )}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="User name"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={userRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  {formik.errors.password && formik.touched.password && (
                    <p
                      // ref={errRef}
                      className={`mb-2 ml-2 text-sm font-light text-red-500`}
                      aria-live="assertive"
                    >
                      {formik.errors.password}
                    </p>
                  )}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    ref={pwdRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                      <p
                        // ref={errRef}
                        className={`mb-2 ml-2 text-sm font-light text-red-500`}
                        aria-live="assertive"
                      >
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                </div>

                <p
                  // ref={errRef}
                  className={`text-center ${errMsg ? "errmsg" : "offscreen"}`}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                      checked={checkSubmit}
                      onChange={() => setCheckSubmit(!checkSubmit)}
                      ref={checkRef}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-900 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-900 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
