import React from "react";

export default function ButtonIcon({
  text,
  buttonClass,
  textClass,
  onClick,
  id,
  ...props
}) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`flex justify-center items-center border border-gray-300 w-fit  p-2 rounded hover:border-gray-900 hover:cursor-pointer ${buttonClass}`}
    >
      {props.children}
      <span className={`ml-2 ${textClass}`}> {text}</span>
    </div>
  );
}
