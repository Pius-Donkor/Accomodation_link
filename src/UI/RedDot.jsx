import React from "react";

export default function RedDot({
  position = "top-0 right-0 ",
  padSize = "p-3",
}) {
  return (
    <span
      className={` absolute ${position} rounded-full bg-red-400 ${padSize}  `}
    ></span>
  );
}
