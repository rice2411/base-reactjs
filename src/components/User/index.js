import React, { useCallback, useEffect, useRef, useState } from "react";
import { FILE_PATH } from "../../constant/staticPath";
import UserService from "../../service/user";
import { debounce } from "lodash";
import Pagination from "../../shared/Table/Pagination";
import Loading from "../../shared/Animations/Loading";
import { PAGINATE } from "../../constant/paginate";

export default function User() {
  const actionListRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contentSearch, setContentSearch] = useState("");
  const params = {
    page: 1,
    limit: PAGINATE.limit,
    search: contentSearch || "",
  };
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
  });

  const fetchUsers = async (params) => {
    const param = {
      ...params,
      search: params.search || "",
    };
    setIsLoading(true);
    try {
      const response = await UserService.getUsers(param);
      console.log(response);
      if (response?.data?.data) {
        setUsers(response?.data?.data);
        setPagination(response?.data?.paginate);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowAction = () => {
    if (actionListRef.current.classList.contains("hidden")) {
      actionListRef.current.classList.remove("hidden");
      actionListRef.current.classList.add("block");
    } else {
      actionListRef.current.classList.remove("block");
      actionListRef.current.classList.add("hidden");
    }
  };
  const handleChangeSearch = (e) => {
    setContentSearch(e.target.value);
    handleDebounceSearch(e.target.value);
  };

  const handleDebounceSearch = useCallback(
    debounce((searchValue) => {
      fetchUsers({
        ...params,
        search: searchValue,
      });
    }, 400),
    []
  );
  useEffect(() => {
    fetchUsers(params);
    setContentSearch("");
  }, []);

  return (
    <div className="my-10">
      <h2
        className={` mb-5 text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white`}
      >
        Users
      </h2>
      <div className="overflow-x-auto relative shadow-2xl sm:rounded-lg">
        <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
          <div>
            <button
              onClick={() => {
                handleShowAction();
              }}
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 "
              type="button"
            >
              <span className="sr-only">Action button</span>
              Action
              <svg
                className="ml-2 w-3 h-3"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              ref={actionListRef}
              className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 hidden"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: 0,
                transform: "translate3d(0px, 46.4px, 0px)",
              }}
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="bottom"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Reward
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Promote
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Activate account
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete User
                </a>
              </div>
            </div>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={contentSearch || ""}
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left align-middle text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>

              <th scope="col" className="py-3 px-6">
                STT
              </th>

              <th scope="col" className="py-3 px-6">
                Họ và tên
              </th>
              <th scope="col" className="py-3 px-6">
                Position
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tr className="text-center">
              <td colSpan={6} className="py-4 px-6">
                <Loading />
              </td>
            </tr>
          ) : (
            <tbody>
              {users && users?.length ? (
                users.map((user, index) => (
                  <tr
                    key={user?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                  >
                    <td className="p-4 w-4 align-middle">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th className="py-4 px-6 align-middle">
                      {PAGINATE.limit * (pagination?.page - 1) + index + 1}
                    </th>
                    <th
                      scope="row"
                      className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`${FILE_PATH + user?.avatar}`}
                        alt="Jese image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user?.firstname + " " + user?.lastname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user?.email}
                        </div>
                      </div>
                    </th>
                    <td className=" align-middle">React Developer</td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" />{" "}
                        Online
                      </div>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit user
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={6} className="py-4 px-6">
                    {" "}
                    "Hiện không có dữ liệu phù hợp"
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-center items-center mt-3">
        {pagination?.totalPages > 1 && (
          <Pagination
            setIsLoading={setIsLoading}
            fetchData={fetchUsers}
            paginate={pagination}
            params={params}
          />
        )}
      </div>
    </div>
  );
}
