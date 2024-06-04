import React from "react";

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
      <div className="flex h-fit w-fit flex-col items-center rounded-2xl bg-[#fff8f8c9] pb-12 text-slate-800 shadow-md backdrop-blur-sm ">
        <img src="/webLogo.png" alt="logo" className="w-[300px]" />
        <p className="text-3xl ">{heading}</p>
        {children}
      </div>
    </div>
  );
}
