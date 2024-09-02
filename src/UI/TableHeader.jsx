import React from "react";

export default function TableHeader({ children }) {
  return (
    <thead className=" sticky left-0 top-0 z-10 divide-y-8 divide-gray-200 bg-slate-50 ">
      {children}
    </thead>
  );
}
