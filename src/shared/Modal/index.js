import React, { useEffect } from "react";
import { Modal as ModalDefault } from "flowbite-react";
import { handleHiddenScrollBar } from "../../utils/scrollbar";

export const handleCloseModal = (setClose) => {
  document.documentElement.classList.remove("overflow-hidden");
  setClose(false);
};
export default function Modal({ isOpen, setClose, ...props }) {
  const handleRemoveModalClass = () => {
    const modal = document.getElementById("modal");
    modal?.classList?.remove("items-center");
  };

  useEffect(() => {
    handleRemoveModalClass();
    if (isOpen) {
      handleHiddenScrollBar();
    }
  }, [isOpen]);

  return (
    <ModalDefault
      show={isOpen}
      size="xl"
      onClose={() => handleCloseModal(setClose)}
    >
      {props.children}
    </ModalDefault>
  );
}
