import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className=" flex h-[100%] flex-col justify-between">
      <NavBar />
      <>{<Outlet />}</>
      <Footer />
    </div>
  );
}
