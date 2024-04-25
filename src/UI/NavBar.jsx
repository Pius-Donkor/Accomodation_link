import React from "react";
import { LiaSearchSolid } from "react-icons/lia";
import Button from "./Button";
import Logo from "./Logo";
export default function NavBar() {
  return (
    <nav className=" flex items-center justify-between bg-slate-200 px-14 ">
      <Logo />
      <div className=" flex">
        <button className=" flex w-16 justify-center rounded-l-lg border-none bg-green-600 p-1  hover:bg-green-700 ">
          <LiaSearchSolid className=" text-3xl text-slate-100 " />
        </button>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="enter location"
          className=" h-10 w-36 rounded-r-lg bg-[#ffffffa8] px-3 py-1 text-xl outline-none transition-all hover:w-44 hover:bg-[#ffffffe1] "
        />
      </div>
      <div className="flex gap-4">
        <Button type={"transparent"}>Login</Button>
        <Button type={"colored"}>SignUp</Button>
      </div>
    </nav>
  );
}
