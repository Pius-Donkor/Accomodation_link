import React from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import Button from "./Button";
import { FaHome } from "react-icons/fa";
import { useMoveBack } from "../hooks/useMoveBack";

export default function HomeBack({
  topCorner = false,
  isColumn = false,
  isRow = false,
}) {
  const moveBack = useMoveBack();

  return (
    <div
      className={`${topCorner ? " absolute left-4  top-4" : ""} inline-flex gap-4  ${isColumn && !isRow && "flex-col lg:flex-row "} ${isRow && !isColumn && "flex-row lg:flex-col "} `}
    >
      <Button link={"/"} type="nav">
        <FaHome className=" mr-2 text-slate-700 " /> home
      </Button>
      <Button type="nav" onClick={moveBack}>
        <BiSolidLeftArrow className=" text-slate-700" /> back
      </Button>
    </div>
  );
}
