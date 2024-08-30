import React from "react";

export default function TableData({
  children,
  hasButtons = false,
  withFlex = false,
  hasBoldText = false,
}) {
  return (
    <td
      className={` ${withFlex ? "flex" : ""} ${hasBoldText ? "font-medium " : ""}  ${hasButtons ? "justify-center gap-2" : "flex-col items-center"} relative  whitespace-nowrap px-6 py-4 text-center  text-sm text-gray-900`}
    >
      {children}
    </td>
  );
}
