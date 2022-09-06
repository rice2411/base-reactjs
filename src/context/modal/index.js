import React from "react";
import ReactDOM from "react-dom";
import { createContext } from "react";
import { MODAL_ROOT } from "../../constant/modal";
import AlertSuccess from "../../small_components/Alert/Success";
import AlertError from "../../small_components/Alert/Error";
import Confirm from "../../small_components/Confirm";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const handleOpenAlertSucess = async (text, onSubmit) => {
    const alert = document.getElementById("alert-success");
    alert?.classList.remove("hidden");
    alertSuccessModal(text, onSubmit);
  };
  const alertSuccessModal = (text, onSubmit) => {
    ReactDOM.render(
      <AlertSuccess isOpen={true} text={text} onSubmit={onSubmit} />,
      document.getElementById(MODAL_ROOT)
    );
    return;
  };
  const handleOpenAlertError = async (text) => {
    const alert = document.getElementById("alert-error");
    alert?.classList.remove("hidden");
    alertErrorModal(text);
  };
  const alertErrorModal = (text) => {
    ReactDOM.render(
      <AlertError isOpen={true} text={text} />,
      document.getElementById(MODAL_ROOT)
    );
    return;
  };
  const handleOpenConfirm = async (text, onSubmit) => {
    const alert = document.getElementById("confirm");
    alert?.classList.remove("hidden");
    confirmModal(text, onSubmit);
  };
  const confirmModal = (text, onSubmit) => {
    ReactDOM.render(
      <Confirm isOpen={true} text={text} onSubmit={onSubmit} />,
      document.getElementById(MODAL_ROOT)
    );
    return;
  };
  return (
    <ModalContext.Provider
      value={{ handleOpenAlertSucess, handleOpenAlertError, handleOpenConfirm }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
