import React from "react";
import { createPortal } from "react-dom";

export default function PageLoading() {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full min-w-full flex-col items-center justify-center bg-[#000000e0]  ">
      <img
        className=" w-[13rem] animate-bounce  "
        src="/pageLoadImg.png"
        alt="loading_Image"
      />
      <img
        className=" fixed bottom-[5rem] z-[-1]"
        src="/3D Text@1x-1.0s-280px-250px.gif"
        alt="gif"
      />
      <img
        className=" fixed bottom-0 z-[-2] h-[50dvh] w-[50%] opacity-[0.5] blur-sm backdrop-blur-sm "
        src="/loadingCityImg.jpeg"
        alt="loading_Image"
      />
    </div>,
    document.body,
  );
}
