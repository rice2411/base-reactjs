import AuthService from "../service/auth";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
  };

  return logout;
};

export default useLogout;
