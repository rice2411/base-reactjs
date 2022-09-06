import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useModal from "../../hooks/useModal";

export default function Confirm({ isOpen, text, onSubmit }) {
  const { handleOpenAlertError } = useModal();
  const handleClose = () => {
    const alert = document.getElementById("confirm");
    alert?.classList.add("hidden");
  };

  return (
    <>
      <Modal
        show={isOpen}
        size="md"
        popup={true}
        id="confirm"
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  try {
                    onSubmit();
                    handleClose();
                  } catch (err) {
                    handleOpenAlertError(err?.response?.data?.message);
                  }
                }}
              >
                Đồng ý
              </Button>
              <Button color="gray" onClick={() => handleClose()}>
                Huỷ
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
