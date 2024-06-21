import React, { useReducer, useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import Button from "./Button";
import SortBy from "./SortBy";
import Modal from "./Modal";
import FilterWindow from "./FilterWindow";
import useFilterSort from "../hooks/useFilterSort";
export default function OptionsBar({ page = "home", isUser = false }) {
  const [navFoldOpen, setNavFoldOpen] = useState(false);
  const { sortedProperties } = useFilterSort(isUser);
  // checking for small mobile screens
  const isSmallScreen = useRef(window.innerWidth).current < 768;

  const toggleNavFoldOpening = navFoldOpen && isSmallScreen;
  const isHomepage = page === "home";
  return (
    <nav
      className={` ${page === "home" ? "fixed md:mt-20 " : "absolute left-0 top-[-5.4rem]  lg:top-0  "} z-[999] w-[100%] transition-all ${toggleNavFoldOpening ? (isHomepage ? "mt-[6.05rem] " : "mt-[8.05rem]") : `${isSmallScreen && "mt-[-5.5rem]"}`} flex  flex-col items-center gap-10 px-14 py-2 shadow-md   backdrop-blur-lg 
    md:w-[100%] md:flex-row md:items-center md:justify-between md:gap-12 md:bg-slate-100  `}
    >
      <div className=" flex justify-center ">
        <Modal>
          <Modal.Window openName={"filter"}>
            <FilterWindow />
          </Modal.Window>
          <Modal.Open openName={"filter"}>
            <Button type={"greenLight"}>
              <IoFilterOutline className="mt-1 " /> filter
            </Button>
          </Modal.Open>
        </Modal>
      </div>
      <div className=" flex items-center">
        <h1 className=" text-lg font-semibold">Sort By:</h1>
        <SortBy />
      </div>

      <p>
        <span className=" font-bold">{sortedProperties.length} </span>
        <span> listings found</span>
      </p>

      <button
        onClick={() => setNavFoldOpen((prev) => !prev)}
        onDrag={() => setNavFoldOpen((prev) => !prev)}
        draggable
        className={`  absolute bottom-[-1.9rem] cursor-pointer  rounded-md ${navFoldOpen ? " bg-[#b46c6c] " : "bg-slate-300"}   p-1 shadow-md hover:scale-105 md:hidden `}
      >
        {navFoldOpen ? (
          <IoIosArrowUp className="w-10 text-3xl" />
        ) : (
          <IoIosArrowDown className="w-10 text-3xl" />
        )}
      </button>
    </nav>
  );
}
