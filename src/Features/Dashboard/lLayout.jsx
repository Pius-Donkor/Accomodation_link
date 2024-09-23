// src/components/Layout.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../../UI/Button";
import HomeBack from "../../UI/HomeBack";

const Layout = ({ children, userData }) => {
  const [activePage, setActivePage] = useState("overview");
  const location = useLocation();
  useEffect(() => {
    setActivePage(
      location.pathname.slice(location.pathname.lastIndexOf("/") + 1),
    );
  }, [location]);

  function checkPageActivity(pathname) {
    return activePage === pathname ? "bg-slate-400" : "";
  }

  return (
    <div className=" flex  min-h-screen bg-gray-100  ">
      <aside className="fixed left-0 top-0 flex h-[100dvh] w-64 flex-col items-center bg-slate-200 shadow-lg ">
        <img src="/webLogo.png" alt="logo" className="-ml-4 -mt-8 w-full" />

        <nav className="inline-flex w-[90%] flex-col items-center  rounded-md bg-slate-300 shadow-md ">
          <Link
            to="overview"
            className={` w-full border-b border-b-slate-200 py-2 text-center transition-colors ${checkPageActivity("overview")} rounded-md hover:bg-slate-400 `}
          >
            Overview
          </Link>
          <Link
            to="users"
            className={`w-full border-b border-b-slate-200 py-2 text-center transition-colors  ${checkPageActivity("users")} rounded-md hover:bg-slate-400`}
          >
            Users
          </Link>
          <Link
            to="allproperties"
            className={`w-full py-2 text-center transition-colors ${checkPageActivity("allproperties")} rounded-md hover:bg-slate-400`}
          >
            Properties
          </Link>
        </nav>
      </aside>
      {/* navbar */}
      <nav className="fixed right-0 top-0 z-50 flex w-[calc(100%-16rem)] items-center justify-between bg-slate-200 px-4 py-2 shadow-lg ">
        <HomeBack />

        <div className="flex items-center gap-2">
          <img
            src="/dummyPerson.png"
            alt="dummy_image"
            className="w-8 rounded-full bg-black "
          />
          <p>{userData?.userName}</p>
          <Button>logout</Button>
        </div>
      </nav>

      <main className=" ml-64 mt-16 w-[80vw] p-6  ">{children}</main>
    </div>
  );
};

export default Layout;
