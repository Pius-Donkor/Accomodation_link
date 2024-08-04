import React from "react";
import { FiClock } from "react-icons/fi";

function RecentActivities() {
  return (
    <div className="flex  h-[15rem] flex-1 flex-col gap-3 rounded-lg bg-white p-4 shadow-sm ">
      <div className=" mt-6 flex items-center gap-3 ">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full  bg-cyan-200 `}
        >
          <FiClock className={`text-3xl text-cyan-800 `} />
        </span>
        <h2 className="text-lg font-medium">Recent Activities</h2>
      </div>

      <ul className="flex flex-grow-0 flex-col items-start gap-2  overflow-y-auto  overflow-x-hidden  py-2 ">
        <li className=" w-full text-ellipsis whitespace-nowrap rounded-3xl bg-slate-200 p-2  transition-all  duration-300 hover:overflow-visible hover:whitespace-normal ">
          User John added a new property
          hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.
        </li>
        <li className=" w-full text-ellipsis whitespace-nowrap rounded-3xl bg-slate-200 p-2  transition-all  duration-300 hover:overflow-visible hover:whitespace-normal ">
          Mary updated her property listing.
        </li>
        <li className=" w-full text-ellipsis whitespace-nowrap rounded-3xl bg-slate-200 p-2  transition-all  duration-300 hover:overflow-visible hover:whitespace-normal ">
          Mary updated her property listing.
        </li>
        <li className=" w-full text-ellipsis whitespace-nowrap rounded-3xl bg-slate-200 p-2  transition-all  duration-300 hover:overflow-visible hover:whitespace-normal ">
          Mary updated her property listing.
        </li>
      </ul>
    </div>
  );
}

export default RecentActivities;
