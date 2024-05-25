import React from "react";

export default function LoadingPropertyCard() {
  return (
    <div className="flex  w-[22rem]  animate-pulse flex-col items-center gap-4 rounded-md border-2 border-solid border-slate-200 bg-[#f9faff] p-4 shadow-xl md:w-[70%] lg:w-[22rem]">
      <div className="relative h-[15rem] w-[100%] rounded-md bg-slate-500">
        <div className="h-[100%] w-[100%] rounded-md bg-slate-400"></div>
      </div>
      {/* Card details */}
      <div className="flex w-[100%] flex-col gap-3">
        <span className="h-4 w-[90%] bg-slate-500 "></span>
        <span className="h-4 w-[90%] bg-slate-500 "></span>
        <span className="h-4 w-[90%] bg-slate-500 "></span>
        <span className="h-4 w-[90%] bg-slate-500 "></span>
        <span className="h-4 w-[90%] bg-slate-500 "></span>
        <span className="h-4 w-[90%] bg-slate-500 "></span>
      </div>
    </div>
  );
}
