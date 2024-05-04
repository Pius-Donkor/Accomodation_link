import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import Button from "./Button";
export default function OptionsBar() {
  return (
    <nav className="fixed  z-[999] mt-[5rem] flex  w-[100%] items-center justify-between gap-12 bg-slate-100 px-14 py-2 ">
      <div className=" flex justify-center ">
        <Button type={"greenLight"}>
          <IoFilterOutline className="mt-1 " /> filter
        </Button>
      </div>
      <div className=" flex items-center">
        <h1 className=" text-lg font-semibold">Sort By:</h1>
        <select
          className="  flex justify-center gap-1 rounded-sm bg-[#9adf9a]  px-2 py-1 text-lg shadow-sm outline-none transition-all hover:bg-green-500 hover:text-slate-100"
          name="sort"
          id="sort"
        >
          <option value="all">All</option>
          <option value="low-Price">Low to high Price </option>
          <option value="high-price">High to low Price </option>
          <option value="recent">Most recent </option>
        </select>
      </div>

      <p>
        <span className=" font-bold">654 </span> <span> listings found</span>{" "}
      </p>
    </nav>
  );
}
