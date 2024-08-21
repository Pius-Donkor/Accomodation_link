import React from "react";

export default function Table({ children }) {
  return (
    <table className=" divide-y divide-gray-200 overflow-x-auto rounded-lg bg-white shadow-sm ">
      {children}
    </table>
  );
}
