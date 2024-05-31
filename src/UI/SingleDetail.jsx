import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function SingleDetail({ title, value }) {
  return (
    <div className="  inline-flex items-center gap-1 rounded-3xl bg-slate-50 px-2 py-1 shadow-md ">
      <IoCheckmarkCircle className=" rounded-full bg-[#bdf3bd] p-1 text-4xl text-[#32be32]  " />
      <p className=" text-xl font-semibold  ">{title} :</p>
      <span className=" text-lg"> {value}</span>
    </div>
  );
}
