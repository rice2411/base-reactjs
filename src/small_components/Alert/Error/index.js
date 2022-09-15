import React from "react";
import { Modal, Button } from "flowbite-react";

import { handleCloseModal } from "../../../context/modal";

export default function AlertError({ text }) {
  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <Modal
        show={true}
        size="md"
        popup={true}
        id="alert-error"
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <div className="flex justify-center items-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-600 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>

              <h3 className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                {text}
              </h3>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
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
