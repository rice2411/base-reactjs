import React from "react";

import { createContext } from "react";

import AlertSuccess from "../../small_components/Alert/Success";
import AlertError from "../../small_components/Alert/Error";
import Confirm from "../../small_components/Confirm";
import { modalRoot } from "../..";

const ModalContext = createContext({});
export const handleCloseModal = async () => {
  modalRoot.render("");

  return;
};
export const ModalProvider = ({ children }) => {
  const handleOpenAlertSucess = async (text, onSubmit) => {
    modalRoot.render(<AlertSuccess text={text} onSubmit={onSubmit} />);
    return;
  };

  const handleOpenAlertError = async (text) => {
    modalRoot.render(<AlertError text={text} />);
    return;
  };

  const handleOpenConfirm = async (text, onSubmit) => {
    modalRoot.render(<Confirm text={text} onSubmit={onSubmit} />);
    return;
  };

  return (
    <ModalContext.Provider
      value={{
        handleOpenAlertSucess,
        handleOpenAlertError,
        handleOpenConfirm,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
