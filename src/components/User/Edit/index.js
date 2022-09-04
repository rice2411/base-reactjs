import React from "react";

export function HeaderContent() {
  return (
    <div className="px-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Chỉnh sửa người dùng
      </h3>
    </div>
  );
}
export function BodyContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-12 sm:col-span-6 flex justify-center">
          <img
            className="w-40 h-40 rounded-full"
            src="/images/avatar.jpg"
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
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bonnie"
            required=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Green"
            required=""
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
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="phone-number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="number"
            name="phone-number"
            id="phone-number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. +(12)3456 789"
            required=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Development"
            required=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company
          </label>
          <input
            type="number"
            name="company"
            id="company"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={123456}
            required=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="current-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            name="current-password"
            id="current-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="new-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required=""
          />
        </div>
      </div>
    </div>
  );
}
