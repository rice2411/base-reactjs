import React from "react";
import {
  Modal as ModalDefault,
  TextInput,
  Checkbox,
  Label,
  Button,
} from "flowbite-react";
import { FILE_PATH } from "../../../constant/staticPath";
export default function EditUserModal({ user }) {
  console.log(user);
  return (
    <>
      <ModalDefault.Header>
        <div className="px-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa người dùng
          </h3>
        </div>
      </ModalDefault.Header>

      <ModalDefault.Body>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-12 sm:col-span-6 flex justify-center">
              <img
                className="w-40 h-40 rounded-full"
                src={FILE_PATH + user?.avatar || "/images/avatar.jpg"}
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
                className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
              ></input>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ và tên đệm
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Họ và tên đệm"
                required=""
                value={user?.firstname || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên"
                required=""
                value={user?.lastname || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@company.com"
                required=""
                value={user?.email || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone-number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Số điện thoại"
                required=""
                value={user?.phoneNumber || ""}
              />
            </div>
          </div>
        </div>
      </ModalDefault.Body>
    </>
  );
}
