import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Services/firebase";
import useGetUser from "../Features/User/useGetUser";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { logout } from "../Services/apiUser";
import toast from "react-hot-toast";
export default function SideNav() {
  const { userData = {}, isLoading, error } = useGetUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("you have been logged out successfully");
    navigate("/");
  }

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
        {!isLoading ? (
          <>
            {userData.email && (
              <p className="flex items-center gap-2 text-[#2b2849] ">
                <MdEmail /> {userData.email}{" "}
              </p>
            )}
            {userData.userName && (
              <p className="flex items-center gap-2 text-[#2b2849] ">
                <FaUser /> {userData.userName}{" "}
              </p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
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
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </aside>
  );
}
