import React, { useEffect, useRef } from "react";
import SendMail from "./SendMail";
import OTP from "./OTP";
import ResetPassword from "./ResetPassword";
import { useState } from "react";
import { STEPS } from "./helper";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [time, setTime] = useState(0);

  const step1 = useRef();
  const step2 = useRef();
  const step3 = useRef();
  const emailRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      if(time!== 0) setTime(time-1);
    },1000)
  }, [time])

  const classStep = {
    leftSide: "-translate-x-full",
    rightSide: "translate-x-full",
  };

  const handleSetEmail = (mail) => {
    setEmail(mail);
  };

  const handleSetTime = (t) => {
    setTime(t);
  };

  const handleSettoken = (token) => {
    setToken(token);
  };
  const nextStep = (step) => {
    if (step == STEPS.otp) {
      step1.current.classList.add(classStep.leftSide);
      step2.current.classList.remove(classStep.rightSide);
      setTime(90);
    }
    if (step == STEPS.resetPassword) {
      step2.current.classList.add(classStep.leftSide);
      step3.current.classList.remove(classStep.rightSide);
    }
  };
  const previousStep = (step) => {
    if (step == STEPS.sendMail) {
      step1.current.classList.remove(classStep.leftSide);
      step2.current.classList.add(classStep.rightSide);
    }
    if (step == STEPS.otp) {
      step2.current.classList.remove(classStep.leftSide);
      step3.current.classList.add(classStep.rightSide);
    }
  };

  useEffect(() => {
    step2.current.classList.add(classStep.rightSide);
    step3.current.classList.add(classStep.rightSide);
    emailRef.current.focus();
  }, []);

  return (
    <div className="h-screen w-screen flex relative overflow-hidden">
      <SendMail
        setEmail={handleSetEmail}
        className="absolute inset-0 transform-translate duration-500 linear"
        refStep={step1}
        emailRef = {emailRef}
        nextStep={nextStep}
      />
      <OTP
        email={email}
        setToken={handleSettoken}
        setTime={handleSetTime}
        className="absolute inset-0 transform-translate duration-500 linear"
        refStep={step2}
        time = {time}
        nextStep={nextStep}
        previousStep={previousStep}
      />
      <ResetPassword
        token={token}
        className="absolute inset-0 transform-translate duration-500 linear"
        refStep={step3}
        previousStep={previousStep}
      />
    </div>
  );
}
