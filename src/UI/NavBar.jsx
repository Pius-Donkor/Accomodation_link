import React, { useRef, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { LuUserCircle } from "react-icons/lu";
import Button from "./Button";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const windowWidth = useRef(window.innerWidth);
  const isSmallScreen = windowWidth.current < 768;
  const [isSCMenuOpen, setIsSCMenuOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(isSmallScreen, windowWidth);
  return (
    <nav className=" fixed z-[9999] flex w-[100%]  justify-between bg-slate-200 px-2 py-2 md:items-center md:px-14 md:py-0 ">
      <Logo />

      <div className=" mt-5 flex md:mt-0 ">
        <button className="  h-[2.5rem]  justify-center rounded-l-lg  border-none bg-green-600 p-1 hover:bg-green-700 md:flex md:h-[2.5rem] md:w-16 ">
          <LiaSearchSolid className=" text-3xl text-slate-100 " />
        </button>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="enter location"
          className=" h-10 w-36 rounded-r-lg bg-[rgba(255,255,255,0.66)] px-3 py-1 text-xl outline-none transition-all hover:w-44 hover:bg-[#ffffffe1] "
        />
      </div>
      <button
        className={` mr-[-1px]  md:hidden ${isSCMenuOpen ? "absolute right-[10rem] top-4 z-[1000] " : ""}`}
        onClick={() => setIsSCMenuOpen((prev) => !prev)}
      >
        {isSCMenuOpen ? (
          <FaTimes className="text-4xl text-white " />
        ) : (
          <IoReorderThreeOutline className="text-4xl  " />
        )}
      </button>
      <div
        className={`absolute flex flex-col gap-4 md:flex-row lg:items-center ${isSmallScreen && isSCMenuOpen ? "right-[0rem]" : "right-[-20rem]"}   z-[999] h-[70dvh] bg-slate-400 p-2 transition-[300ms] md:relative md:right-0 md:z-0  md:h-[inherit] md:bg-transparent`}
      >
        {/* USER PAGE BUTTON */}
        <span
          onClick={() => navigate("user")}
          role="button"
          className="mt-20  w-fit rounded-full bg-green-50 px-1 py-1 hover:bg-green-200 md:mt-0 "
        >
          <LuUserCircle className="text-[2rem]" />
        </span>
        <div className=" flex gap-4   ">
          <Button type={"transparent"} link={"login"}>
            Login
          </Button>
          <Button link={"signup"} type={"colored"}>
            SignUp
          </Button>
        </div>
      </div>
    </nav>
  );
}
