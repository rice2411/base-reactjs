import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createContext } from "react";
import { MODAL_ROOT } from "../../constant/modal";
import AlertSuccess from "../../small_components/Alert/Success";
import AlertError from "../../small_components/Alert/Error";
import Confirm from "../../small_components/Confirm";
import { createRoot } from "react-dom/client";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [root, setRoot] = useState(null);
  const handleOpenAlertSucess = async (text, onSubmit) => {
    const alert = document.getElementById("alert-success");
    alert?.classList.remove("hidden");
    alertSuccessModal(text, onSubmit);
  };
  const alertSuccessModal = (text, onSubmit) => {
    root.render(<AlertSuccess isOpen={true} text={text} onSubmit={onSubmit} />);
    return;
  };
  const handleOpenAlertError = async (text) => {
    const alert = document.getElementById("alert-error");
    alert?.classList.remove("hidden");
    alertErrorModal(text);
  };
  const alertErrorModal = (text) => {
    root.render(<AlertError isOpen={true} text={text} />);

    return;
  };
  const handleOpenConfirm = async (text, onSubmit) => {
    const alert = document.getElementById("confirm");
    alert?.classList.remove("hidden");
    confirmModal(text, onSubmit);
  };
  const confirmModal = (text, onSubmit) => {
    root.render(<Confirm isOpen={true} text={text} onSubmit={onSubmit} />);
    return;
  };
  useEffect(() => {
    if (!root) {
      const temp = createRoot(document.getElementById(MODAL_ROOT));
      setRoot(temp);
    }
  }, []);
  return (
    <ModalContext.Provider
      value={{ handleOpenAlertSucess, handleOpenAlertError, handleOpenConfirm }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
