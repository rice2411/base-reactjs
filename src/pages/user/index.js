import React, { useEffect } from "react";

import User from "../../components/User";
import useAuth from "../../hooks/useAuth";

export default function UserPage() {
  const { protectedRouter } = useAuth();
  useEffect(() => {
    protectedRouter();
  }, []);
  return <User></User>;
}
