import React from "react";
import Main from "../UI/Main";
import SideNav from "../UI/SideNav";
import { Outlet } from "react-router-dom";

export default function User() {
  return (
    <div className=" flex w-[100vw] flex-grow ">
      <SideNav />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
