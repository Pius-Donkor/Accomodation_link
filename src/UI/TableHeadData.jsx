import React from "react";

export default function TableHeadData({ children }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
    >
      {children}
    </th>
  );
}
