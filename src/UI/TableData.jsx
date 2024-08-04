import React from "react";

export default function TableData({
  children,
  hasButtons = false,
  withFlex = false,
}) {
  return (
    <td
      className={` ${withFlex ? "flex" : ""}  ${hasButtons ? "justify-center gap-2" : "flex-col items-center"} whitespace-nowrap  px-6 py-4 text-center text-sm font-medium text-gray-900`}
    >
      {children}
    </td>
  );
}
