import React from "react";
import { GiQuillInk } from "react-icons/gi";
import Button from "./Button";
import { FaHome } from "react-icons/fa";
import { useMoveBack } from "../hooks/useMoveBack";
import { BiSolidLeftArrow } from "react-icons/bi";
export default function AuthBackground({
  children,
  heading = "sign-up for free",
}) {
  const moveBack = useMoveBack();
  return (
    <div
      className="relative flex h-[100dvh] w-full items-center justify-center overflow-y-auto
       bg-contain bg-local bg-center bg-no-repeat pt-[10rem]  md:pt-2 "
      style={{
        backgroundImage:
          "url('/authImage-min.jpg') ,linear-gradient(to bottom, #dedfe3 60%, #fafeff 100%) ",
      }}
    >
      <div className=" absolute left-4  top-4 flex gap-8 ">
        <Button link={"/"} type="nav">
          <FaHome className=" mr-2 text-slate-700 " /> home
        </Button>
        <Button type="nav" onClick={moveBack}>
          <BiSolidLeftArrow className=" text-slate-700" /> back
        </Button>
      </div>
      <div className="flex h-fit w-fit flex-col items-center  rounded-2xl bg-[#fff8f8c9] px-4 pb-4  text-slate-800 shadow-md backdrop-blur-sm ">
        <img src="/webLogo.png" alt="logo" className=" h-[200px] w-[200px] " />
        <p className="mb-4 flex text-3xl ">
          <GiQuillInk /> {heading}
        </p>
        {children}
      </div>
    </div>
  );
}
