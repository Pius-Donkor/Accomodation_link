// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className=" flex  min-h-screen bg-gray-100  ">
      <aside className="fixed left-0 top-0 h-[100dvh] w-64 bg-white shadow-md">
        <nav className="flex flex-col p-4">
          <Link to="overview" className="py-2">
            Overview
          </Link>
          <Link to="users" className="py-2">
            Users
          </Link>
          <Link to="allproperties" className="py-2">
            Properties
          </Link>
          <Link to="analytics" className="py-2">
            Analytics
          </Link>
        </nav>
      </aside>
      <main className=" ml-64 w-[80vw] bg-slate-300  p-6  ">{children}</main>
    </div>
  );
};

export default Layout;
