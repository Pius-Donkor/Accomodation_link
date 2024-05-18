import React, { useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import Button from "./Button";
export default function OptionsBar() {
  const [navFoldOpen, setNavFoldOpen] = useState(false);
  // checking for small mobile screens
  const isSmallScren = useRef(window.innerWidth).current < 768;
  const toggleNavFoldOpening = navFoldOpen && isSmallScren;

  return (
    <nav
      className={` fixed z-[999] w-[100%] transition-all ${toggleNavFoldOpening ? "mt-[6.05rem] " : "mt-[-5.5rem]"} flex  flex-col items-center gap-10 px-14 py-2 shadow-md   backdrop-blur-lg md:mt-20
    md:w-[100%] md:flex-row md:items-center md:justify-between md:gap-12 md:bg-slate-100  `}
    >
      <div className=" flex justify-center ">
        <Button type={"greenLight"}>
          <IoFilterOutline className="mt-1 " /> filter
        </Button>
      </div>
      <div className=" flex items-center">
        <h1 className=" text-lg font-semibold">Sort By:</h1>
        <select
          className="  flex justify-center gap-1 rounded-sm bg-[#9adf9a] px-2  py-1 text-lg shadow-sm outline-none transition-all hover:bg-green-500 hover:text-slate-100 md:text-lg"
          name="sort"
          id="sort"
        >
          <option className=" text-sm md:text-lg  " value="all">
            All
          </option>
          <option className=" text-sm md:text-lg " value="low-Price">
            Low to high Price{" "}
          </option>
          <option className=" text-sm md:text-lg " value="high-price">
            High to low Price{" "}
          </option>
          <option className=" text-sm md:text-lg " value="recent">
            Most recent{" "}
          </option>
        </select>
      </div>

      <p>
        <span className=" font-bold">654 </span> <span> listings found</span>{" "}
      </p>

      <button
        onClick={() => setNavFoldOpen((prev) => !prev)}
        onDrag={() => setNavFoldOpen((prev) => !prev)}
        draggable
        className={` absolute bottom-[-1.7rem] cursor-pointer  rounded-md ${navFoldOpen ? " bg-[#b46c6c] " : "bg-slate-300"}   p-1 shadow-md hover:scale-105 md:hidden `}
      >
        toggle
      </button>
    </nav>
  );
}
