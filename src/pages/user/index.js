import React, { useEffect } from "react";

import User from "../../components/User";
import useAuth from "../../hooks/useAuth";

export default function UserPage() {
  const { handleVerifyToken } = useAuth();
  useEffect(() => {
    handleVerifyToken();
  }, []);
  return <User></User>;
}
