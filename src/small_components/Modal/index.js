import React, { useEffect } from "react";
import { Modal as ModalDefault } from "flowbite-react";

export const handleCloseModal = (setClose) => {
  document.documentElement.classList.remove("overflow-hidden");
  setClose(false);
};
export default function Modal({ isOpen, setClose, ...props }) {
  const handleRemoveModalClass = () => {
    const modal = document.getElementById("modal");
    modal?.classList?.remove("items-center");
  };
  const handleHiddenScrollBar = () => {
    document.documentElement.classList.add("overflow-hidden");
  };

  useEffect(() => {
    handleRemoveModalClass();
    if (isOpen) {
      handleHiddenScrollBar();
    }
  }, [isOpen]);

  return (
    <ModalDefault
      id="modal"
      show={isOpen}
      size="xl"
      onClose={() => handleCloseModal(setClose)}
    >
      {props.children}
    </ModalDefault>
  );
}
