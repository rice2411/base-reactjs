import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { setIsValidToken, setToken, setUser } from "../../utils/auth";  
import AuthService from "../../service/auth";
import UserService from "../../service/user";

function Register() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMsgUserName, setErrMsgUserName] = useState("");
  const [errMsgPwd, setErrMsgPwd] = useState("");
  const [errMsgPwdConfirm, setErrMsgPwdConfirm] = useState("");
  const [checkSubmit, setCheckSubmit] = useState(false);

  const userRef = useRef();
  const pwdRef = useRef();
  const checkRef = useRef();

  useEffect(() => {
    userRef.current.focus();
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
  }, []);

  useEffect(() => {
    setErrMsgUserName("");
    setErrMsgPwd("");
    setErrMsgPwdConfirm("");
  }, [username, password, passwordConfirm]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(checkSubmit){
      if(password.length < 4){
          setErrMsgPwd("Mật khẩu phải dài hơn 3 ký tự!");
          pwdRef.current.focus();
      }
      else if(password != passwordConfirm){
          setErrMsgPwdConfirm("Mật khẩu xác nhận không đúng!");
          pwdRef.current.focus();
      }else{
          const params = {
              username: username,
              password: password,
          };

          try {
              const response = await AuthService.register(params);  

              const res = await AuthService.login(params);

              const { token } = res?.data?.data;

              setToken(token);
              setIsValidToken(true);
              console.log(res?.data?.data)
              const userResponse = await UserService.getMe();
              if (userResponse?.data?.data) {
                setUser(userResponse?.data?.data);
              }

              setUsername("");
              setPassword("");
              setPasswordConfirm("");

              navigate(from, { replace: true });
          } catch (err) {
            if (err?.response) {
              setErrMsgUserName(err.response.data.message);
              userRef.current.focus();
            }
          }
      }
    }else{
      checkRef.current.focus();
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User name
                  </label>
                  <p
                    className={`mb-2 ml-2 text-sm font-light ${errMsgUserName ? "errmsg" : "offscreen"}`}
                    aria-live="assertive"
                  >
                    {errMsgUserName}
                  </p>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="User name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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
                  <p
                    // ref={errRef}
                    className={`mb-2 ml-2 text-sm font-light ${errMsgPwd ? "errmsg" : "offscreen"}`}
                    aria-live="assertive"
                  >
                    {errMsgPwd}
                  </p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    ref = {pwdRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <p
                    // ref={errRef}
                    className={`mb-2 ml-2 text-sm font-light ${errMsgPwdConfirm ? "errmsg" : "offscreen"}`}
                    aria-live="assertive"
                  >
                    {errMsgPwdConfirm}
                  </p>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                  />
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                      checked = {checkSubmit}
                      onChange = {()=> setCheckSubmit(!checkSubmit)}
                      ref = {checkRef}
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
                    to={'/login'}
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
