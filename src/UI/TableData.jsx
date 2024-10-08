import React from "react";

export default function TableData({
  children,
  hasButtons = false,
  withFlex = false,
  hasBoldText = false,
  onClick = () => {},
  isClickable = false,
}) {
  return (
    <td
      onClick={onClick}
      className={` ${withFlex ? "flex" : ""} ${hasBoldText ? "font-medium " : ""}  ${hasButtons ? "justify-center gap-2" : "flex-col items-center"}   ${isClickable ? "cursor-pointer hover:bg-slate-200  " : ""} whitespace-nowrap px-6 py-4 text-center  text-sm text-gray-900`}
    >
      {children}
    </td>
  );
}
