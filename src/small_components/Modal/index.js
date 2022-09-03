import React, { useEffect } from "react";
import { Modal, TextInput, Checkbox, Label, Button } from "flowbite-react";

export default function ModalTest({
  isOpen,
  setClose,
  HeaderContent,
  BodyContent,
  buttonText,
}) {
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
    <Modal
      id="modal"
      show={isOpen}
      size="xl"
      onClose={() => handleCloseModal()}
    >
      <Modal.Header>
        <HeaderContent />
      </Modal.Header>
      <Modal.Body>
        <BodyContent />
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  );
}
