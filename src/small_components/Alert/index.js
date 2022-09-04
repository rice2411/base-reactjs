import React, { useEffect, useState } from "react";
import { Modal, TextInput, Checkbox, Label, Button } from "flowbite-react";
export default function Alert({ isOpen, text, onSubmit }) {
  const handleClose = () => {
    const alert = document.getElementById("alert");
    alert?.classList.add("hidden");
    onSubmit();
  };

  return (
    <>
      <Modal
        show={isOpen}
        size="md"
        popup={true}
        id="alert"
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  handleClose();
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
