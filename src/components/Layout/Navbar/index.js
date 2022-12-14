import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  MoonIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";
import { navigation } from "./navbarData";
import { classNames } from "./helper";

import { Link } from "react-router-dom";

import { getUser } from "../../../utils/auth";
import { DEFAULT_AVATAR, getFile } from "../../../constant/image";
import useMode from "../../../hooks/useMode";
import useAuth from "../../../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const [navi, setNavi] = useState(navigation);
  const { mode, toggleMode } = useMode();
  const user = getUser();

  const handleInitActiveTab = () => {
    const path = window.location.href.split("/");
    const page = path[path.length - 1];

    activeTab(page ? page : "dashboard");
  };
  const activeTab = (page) => {
    let naviArr = [...navi];
    for (let i = 0; i < naviArr.length; i++) {
      if (naviArr[i].href === page) naviArr[i].current = true;
      else naviArr[i].current = false;
    }
    setNavi(naviArr);
  };
  const handleChangeTab = (e) => {
    const path = e.target.href.split("/");
    const page = path[path.length - 1];
    activeTab(page);
  };

  useEffect(() => {
    handleInitActiveTab();
    // eslint-disable-next-line
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/images/logo.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/images/logo.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={`${item.href}`}
                        onClick={(e) => {
                          handleChangeTab(e);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={toggleMode}
                  data-tooltip-target="tooltip-default"
                  type="button"
                  className="hover:bg-gray-700 bg-gray-800 p-1 rounded text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>

                  {mode === "dark" ? (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className=" inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Turn on {mode === "dark" ? " dark " : " light "}mode
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          user.type_account == "default"
                            ? getFile(
                                user.avatar ? user.avatar : DEFAULT_AVATAR
                              )
                            : user.avatar
                        }
                        alt=""
                      />
                      <h3 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        {user.username}
                      </h3>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                            )}
                          >
                            Your Profile
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                            )}
                          >
                            Settings
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => {
                              logout();
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                            )}
                          >
                            Sign out
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
