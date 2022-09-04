import React from "react";
import ReactDOM from "react-dom";
import { createContext, useState } from "react";
import Alert from "../../small_components/Alert";

const ModalContext = createContext({});
export const ModalProvider = ({ children }) => {
  const handleOpenAlertSucess = async (text, onSubmit) => {
    const alert = document.getElementById("alert");
    alert?.classList.remove("hidden");
    alertSuccessModal(text, onSubmit);
  };
  const alertSuccessModal = (text, onSubmit) => {
    ReactDOM.render(
      <Alert isOpen={true} text={text} onSubmit={onSubmit} />,
      document.getElementById("modal")
    );

    return;
  };

  return (
    <ModalContext.Provider value={{ handleOpenAlertSucess }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
