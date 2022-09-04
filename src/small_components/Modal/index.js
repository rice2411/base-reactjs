import React, { useEffect } from "react";
import {
  Modal as ModalDefault,
  TextInput,
  Checkbox,
  Label,
  Button,
} from "flowbite-react";

export default function Modal({ isOpen, setClose, buttonText, ...props }) {
  const handleRemoveModalClass = () => {
    const modal = document.getElementById("modal");
    modal?.classList?.remove("items-center");
  };
  const handleHiddenScrollBar = () => {
    document.documentElement.classList.add("overflow-hidden");
  };
  const handleCloseModal = () => {
    document.documentElement.classList.remove("overflow-hidden");
    setClose(false);
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
      onClose={() => handleCloseModal()}
    >
      {props.children}
      <ModalDefault.Footer>
        <div className="px-6 flex ml-auto">
          <Button onClick={() => handleCloseModal()}>
            {buttonText[0] || "Đồng ý"}
          </Button>
          <div className="ml-3">
            <Button color="gray" onClick={() => handleCloseModal()}>
              {buttonText[1] || "Huỷ"}
            </Button>
          </div>
        </div>
      </ModalDefault.Footer>
    </ModalDefault>
  );
}
