import React from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import OptionsBar from "./OptionsBar";
import HomeBack from "./HomeBack";

export default function Main({ children }) {
  const { displayOptionsBar } = useDisplayOptionsBar();

  return (
    <main className=" relative flex h-[100vh] w-full flex-col bg-slate-200  p-4 lg:w-[80%] ">
      {displayOptionsBar && <OptionsBar page="user" isUser={true} />}
      <div className={`${displayOptionsBar ? "mt-12" : ""}  `}>
        <HomeBack isColumn={true} />
      </div>
      {children}
    </main>
  );
}
