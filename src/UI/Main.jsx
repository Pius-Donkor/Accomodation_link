import React from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import OptionsBar from "./OptionsBar";

export default function Main({ children }) {
  const { displayOptionsBar } = useDisplayOptionsBar();

  return (
    <main className=" relative flex-grow bg-slate-200 ">
      {displayOptionsBar && <OptionsBar page="user" />}
      {children}
    </main>
  );
}
