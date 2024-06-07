import React from "react";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <aside className="h-[100dvh] w-[20%] bg-slate-500 ">
      {/* header part */}
      <div className="w-full"></div>
      <div className="flex w-full flex-col items-center bg-slate-400 px-2 text-slate-800">
        <img
          className="ml-[-0.5rem] mt-[-2rem]  w-[90%] "
          src="/webLogo.png"
          alt="logo"
        />
        <p>email</p>
        <p>username</p>
      </div>
      <div className=" mt-4 flex flex-col items-center gap-12 ">
        <ul className="flex w-full flex-col items-center gap-4 px-1">
          <li className="group w-full py-1 text-center transition-colors duration-300 hover:bg-[#ffffff1e] ">
            <Link
              className=" w-fit bg-[#ffffff1e] px-2 py-1 text-center text-[1.15rem] text-slate-50 transition group-hover:bg-transparent group-hover:px-[5rem] "
              to="mylistings"
            >
              My listings
            </Link>
          </li>
          <li className="group w-full py-1 text-center transition-colors duration-300 hover:bg-[#ffffff1e] ">
            <Link
              className=" w-fit bg-[#ffffff1e] px-2 py-1 text-center text-[1.15rem] text-slate-50 transition group-hover:bg-transparent group-hover:px-[5rem] "
              to="edituser"
            >
              Edit User
            </Link>
          </li>
        </ul>
        <Button>Logout</Button>
      </div>
    </aside>
  );
}
