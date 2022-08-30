import React, { useEffect } from "react";

import User from "../../components/User";
import { isLogin } from "../../utils/auth";

export default function UserPage() {
  useEffect(() => {
    isLogin();
  }, []);
  return <User></User>;
}
