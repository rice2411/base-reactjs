import React from "react";
import "./styles.scss";
export default function Footer() {
  return (
    <>
      <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800 w-full">
        <span className="text-sm  text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Rice™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}
