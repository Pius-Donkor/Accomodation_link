import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUser from "../Features/User/useGetUser";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { logout } from "../Services/apiUser";
import toast from "react-hot-toast";
import ModalLittle from "./ModalLittle";
import EditProfileBtn from "./EditProfileBtn";
import ProfileImageForm from "../Features/User/ProfileImageForm";
import useGetAuthUser from "../Features/User/useGetAuthUser";
export default function SideNav() {
  const { userData = {}, isLoading, error } = useGetUser();
  const { setIsUser } = useGetAuthUser();
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isSmallScreen = useRef(window.innerWidth).current < 1024;

  const [activePage, setActivePage] = useState("mylistings");
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.slice(location.pathname.lastIndexOf("/") + 1) === "user"
    )
      return;
    setActivePage(
      location.pathname.slice(location.pathname.lastIndexOf("/") + 1),
    );
  }, [location]);

  function checkPageActivity(pathname) {
    return activePage === pathname
      ? "bg-slate-300 text-green-950"
      : "text-green-50";
  }

  function handleLogout() {
    logout();
    setIsUser(null);
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
      <div className="relative flex w-full flex-col items-center bg-slate-400 px-2 text-slate-800">
        <ModalLittle>
          <ModalLittle.OpenModalLittle openName="editProfile">
            <EditProfileBtn />
          </ModalLittle.OpenModalLittle>
          <ModalLittle.ModalLittleWindow
            openName="editProfile"
            position="absolute top-2 left-2 z-10 "
          >
            <ProfileImageForm userData={userData} />
          </ModalLittle.ModalLittleWindow>
        </ModalLittle>
        {userData?.profileImage ? (
          <img
            className="  mt-4 w-[50%] rounded-full border-8 border-slate-600 shadow-2xl "
            src={userData.profileImage}
            alt="profile_photo"
          />
        ) : (
          <img
            className="ml-[-0.5rem] mt-[-2rem]  w-[90%] "
            src="/webLogo.png"
            alt="logo"
          />
        )}
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
        <nav className="inline-flex w-[90%] flex-col items-center  rounded-md bg-slate-400 shadow-md ">
          {(userData?.role?.includes("property_owner") ||
            userData?.role?.includes("admin")) && (
            <Link
              to="mylistings"
              className={` w-full rounded-md border-b border-b-slate-100 py-2 text-center ${checkPageActivity("mylistings")}  transition-colors hover:bg-slate-300 hover:text-green-950 `}
            >
              Listings
            </Link>
          )}
          <Link
            to="edituser"
            className={`w-full rounded-md border-b border-b-slate-100 py-2 text-center ${checkPageActivity("edituser")}   transition-colors hover:bg-slate-300 hover:text-green-950`}
          >
            Edit Users Details
          </Link>
          <Link
            to="allrequests"
            className={`w-full rounded-md py-2 text-center ${checkPageActivity("allrequests")}  transition-colors hover:bg-slate-300 hover:text-green-950`}
          >
            All Requests
          </Link>
        </nav>
        <div className="flex flex-col gap-2">
          <Button onClick={handleLogout}>Logout</Button>
          {userData?.role === "admin" && (
            <Button link={"/admindashboard"}>Administration</Button>
          )}
        </div>
      </div>
    </aside>
  );
}
