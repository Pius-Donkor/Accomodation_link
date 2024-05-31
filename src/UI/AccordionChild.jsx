import React from "react";
import { GiCheckMark } from "react-icons/gi";

export default function AccordionChild({ children }) {
  return (
    <p className="flex w-full items-center  gap-3 rounded-3xl bg-slate-100 px-2 py-1 ">
      <GiCheckMark className=" rounded-full bg-green-200 px-2 py-1 text-4xl text-green-700" />
      {children}
    </p>
  );
}
