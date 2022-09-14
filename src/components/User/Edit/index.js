import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal as ModalDefault, Button } from "flowbite-react";
import { DEFAULT_AVATAR, FILE_PATH } from "../../../constant/image";
import { User } from "../../../model/user";
import { handleCloseModal } from "../../../small_components/Modal";
import UserService from "../../../service/user";
import useModal from "../../../hooks/useModal";

export default function EditUserModal({ user, setClose, setIsFetchData }) {
  const { handleOpenAlertSucess, handleOpenAlertError } = useModal();
  const [fileUpload, setFileUpload] = useState({});
  const avatarRef = useRef(null);
  const avatarUploadRef = useRef(null);
  const handleFinishUpdate = () => {
    setIsFetchData((preState) => !preState);
  };
  const handleChangeAvatar = async (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    const src = URL.createObjectURL(file);
    avatarRef.current.src = src;
    setFieldValue("file", file);
    setFileUpload(file);
  };

  const handleUpdateUser = async (values) => {
    let userParam = new User();
    userParam._id = user._id;
    const param = userParam.toRequestUpdate(values);
    const formData = new FormData();
    formData.append("files", fileUpload);
    for (var key in param) {
      formData.append(key, param[key]);
    }

    try {
      await UserService.updateUser(param._id, formData);
      handleOpenAlertSucess("Cập nhật thành công", handleFinishUpdate);
      handleCloseModal(setClose);
      avatarUploadRef.current.value = "";
    } catch (err) {
      handleOpenAlertError(err?.response?.data?.message);
    }
  };
  return (
    <>
      <ModalDefault.Header>
        <div className="px-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa người dùng
          </h3>
        </div>
      </ModalDefault.Header>
      <Formik
        initialValues={{
          firstname: user?.firstname || "",
          lastname: user?.lastname || "",
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
          avatar: user?.avatar || DEFAULT_AVATAR,
          file: null,
        }}
        // validationSchema={loginSchema()}
        onSubmit={handleUpdateUser}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue, handleChange }) => (
          <>
            <Form encType="multipart/form-data">
              <ModalDefault.Body>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-12 sm:col-span-6 flex justify-center">
                      <img
                        ref={avatarRef}
                        className="w-40 h-40 rounded-full"
                        src={FILE_PATH + user?.avatar || DEFAULT_AVATAR}
                        alt="Rounded avatar"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center">
                      <label
                        htmlFor="first-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Ảnh đại diện
                      </label>
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center">
                      <input
                        ref={avatarUploadRef}
                        className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="small_size"
                        type="file"
                        name="file"
                        onChange={(e) => {
                          handleChangeAvatar(e, setFieldValue);
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="firstname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Họ và tên đệm
                      </label>
                      <Field
                        type="text"
                        name="firstname"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Họ và tên đệm"
                        required=""
                        value={values.firstname}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="lastname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tên
                      </label>
                      <Field
                        type="text"
                        name="lastname"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tên"
                        required=""
                        value={values.lastname}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@company.com"
                        required=""
                        value={values.email}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Số điện thoại
                      </label>
                      <Field
                        type="number"
                        name="phoneNumber"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Số điện thoại"
                        required=""
                        value={values.phoneNumber}
                      />
                    </div>
                  </div>
                </div>
              </ModalDefault.Body>
              <ModalDefault.Footer>
                <div className="px-6 flex ml-auto">
                  <Button type="submit">{"Đồng ý"}</Button>
                  <div className="ml-3">
                    <Button
                      color="gray"
                      onClick={() => handleCloseModal(setClose)}
                    >
                      {"Huỷ"}
                    </Button>
                  </div>
                </div>
              </ModalDefault.Footer>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
