import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import OAuth2Service from "../../../service/oauth2";
import UserService from "../../../service/user";
import { setIsValidToken, setToken, setUser } from "../../../utils/auth";

export default function Oauth2() {
  const { id } = useParams();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const provider = query.get("provider");
  const handleLoginOauth2 = async () => {
    try {
      const params = {
        id: id.split("=")[1],
        provider: provider,
      };
      const response = await OAuth2Service.login(params);
      const { token } = response?.data?.data;

      if (response?.data?.data) {
        setToken(token);
        setIsValidToken(true);
        const userResponse = await UserService.getMe();
        if (userResponse?.data?.data) {
          setUser(userResponse?.data?.data);
        }

        window.close();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleLoginOauth2();
  }, []);
  return <h1>Hello {id}</h1>;
}
