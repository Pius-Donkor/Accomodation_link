import React from "react";
import { GiQuillInk } from "react-icons/gi";
export default function AuthBackground({
  children,
  heading = "sign-up for free",
}) {
  return (
    <div
      className="flex h-[100dvh] w-full  items-center justify-center bg-contain bg-local bg-center bg-no-repeat  "
      style={{
        backgroundImage:
          "url('/authImage-min.jpg') ,linear-gradient(to bottom, #dedfe3 60%, #fafeff 100%) ",
      }}
    >
      <div className="flex h-fit w-fit flex-col items-center  rounded-2xl bg-[#fff8f8c9] px-4 pb-12 text-slate-800 shadow-md backdrop-blur-sm ">
        <img
          src="/webLogo.png"
          alt="logo"
          className="mt-[-100px] h-[250px] w-[300px] "
        />
        <p className="mb-4 flex text-3xl ">
          <GiQuillInk /> {heading}
        </p>
        {children}
      </div>
    </div>
  );
}
