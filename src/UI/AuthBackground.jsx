import React from "react";
import { GiQuillInk } from "react-icons/gi";
export default function AuthBackground({
  children,
  heading = "sign-up for free",
}) {
  return (
    <div
      className="flex h-[100dvh] w-full  items-center justify-center overflow-y-auto
       bg-contain bg-local bg-center bg-no-repeat pt-[10rem]  md:pt-2 "
      style={{
        backgroundImage:
          "url('/authImage-min.jpg') ,linear-gradient(to bottom, #dedfe3 60%, #fafeff 100%) ",
      }}
    >
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
