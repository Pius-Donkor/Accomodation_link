import React from "react";

export default function Button({ children, type }) {
  const baseStyle = " border-2 px-3 py-1 text-xl transition-all";
  const buttonStyles = {
    transparent:
      ` border-green-600 bg-transparent hover:bg-[#88c988b7] hover:text-[white]` +
      baseStyle,
    colored:
      ` border-transparent bg-green-600  text-slate-100 transition-all hover:bg-green-700` +
      baseStyle,
  };
  return <button className={buttonStyles[type]}>{children}</button>;
}
