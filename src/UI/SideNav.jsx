import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../Features/User/useGetUser";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { logout } from "../Services/apiUser";
import toast from "react-hot-toast";
export default function SideNav() {
  const { userData = {}, isLoading, error } = useGetUser();
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isSmallScreen = useRef(window.innerWidth).current < 1024;
  function handleLogout() {
    logout();
    toast.success("you have been logged out successfully");
    navigate("/");
  }

  return (
    <aside
      className={`fixed ${sideBarOpen ? "left-[0]" : "left-[-70%]"} z-50 h-[100dvh] w-[70%] bg-slate-500 transition-all  duration-300 lg:relative lg:left-0 lg:z-0 lg:w-[20%] `}
    >
      {/* header part */}
      {isSmallScreen && (
        <button
          onClick={() => setSideBarOpen((prev) => !prev)}
          className="absolute right-[-4rem] top-[50%] z-[-2] h-20 w-[4rem] rounded-lg bg-[#2e2929ef] "
        >
          <img src="/userMenuIcon.png" className="h-full" alt="" />
        </button>
      )}
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
