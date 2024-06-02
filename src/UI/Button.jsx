import React from "react";
import { useNavigate } from "react-router-dom";
export default function Button({
  children,
  type = "greenLight",
  onclick = () => {},
  disable = false,
  onClick,
  link,
}) {
  const navigate = useNavigate();
  const baseStyle = " border-2 px-3 py-1 text-xl transition-all";
  const buttonStyles = {
    transparent:
      ` border-green-600 md:text-2xl lg:text-xl bg-transparent hover:bg-[#88c988b7] hover:text-[white]` +
      baseStyle,
    colored:
      ` border-transparent bg-green-600  text-slate-100 transition-all hover:bg-green-700` +
      baseStyle,
    greenLight: ` flex justify-center gap-1 rounded-sm bg-[#9adf9a] px-2 py-1 ${disable ? "bg-slate-300" : ""} text-xl shadow-sm transition-all hover:bg-slate-500 hover:text-slate-100  `,
    nav: ` flex items-center rounded-2xl bg-[#edf3ff] px-2 py-1 shadow-lg transition-colors duration-300 hover:bg-[#bde2bd] `,
    reddish: ` flex items-center rounded-2xl bg-[#b33479] px-2 py-1 shadow-lg text-[white] transition-colors duration-300  hover:bg-[#9c5f81] `,
    transparentRed: ` flex items-center rounded-2xl bg-[transparent]  border-[#b33479] border-[1px] px-2 py-0 shadow-lg text-[#b33479] transition-colors duration-300 hover:bg-[#9c5f81]  hover:text-[white]`,
  };
  if (link) {
    return (
      <button
        disabled={disable}
        onClick={() => navigate(link)}
        className={buttonStyles[type]}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        disabled={disable}
        onClick={onClick ? onClick : onclick}
        className={buttonStyles[`${type}`]}
      >
        {children}
      </button>
    );
  }
}
