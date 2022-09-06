import React from "react";
import { Modal, Button } from "flowbite-react";
export default function AlertSuccess({ isOpen, text, onSubmit }) {
  const handleClose = () => {
    const alert = document.getElementById("alert-success");
    alert?.classList.add("hidden");
    onSubmit();
  };

  return (
    <>
      <Modal
        show={isOpen}
        size="md"
        popup={true}
        id="alert-success"
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
                className="w-6 h-6 text-green-700 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h3 className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                {text}
              </h3>
            </div>
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
