import React, { useEffect } from "react";
import SendMail from "./SendMail";
import OTP from "./OTP";
import ResetPassword from "./ResetPassword";
import { useState } from "react";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailForm, setEmailform] = useState(true);
  const [otpForm, setOtpform] = useState(false);

  const handleSetEmail = (mail) => {
    setEmail(mail);
  };

  const handleSettoken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    const frmEmail = document.getElementById("forgotPwd-mail");
    frmEmail?.classList.remove("-translate-x-full");
    const frmOtp = document.getElementById("forgotPwd-otp");
    frmOtp?.classList.add("translate-x-full");
    const frmReset = document.getElementById("forgotPwd-reset");
    frmReset?.classList.add("translate-x-full");
  }, []);

  return (
    <div className="h-screen w-screen flex relative overflow-hidden">
      <SendMail
        setEmail={handleSetEmail}
        className="absolute inset-0 transform-translate duration-500 linear"
      />
      <OTP
        email={email}
        setToken={handleSettoken}
        className="absolute inset-0 transform-translate duration-500 linear"
      />
      <ResetPassword
        token={token}
        className="absolute inset-0 transform-translate duration-500 linear"
      />
    </div>
  );
}

export default ForgotPassword;
