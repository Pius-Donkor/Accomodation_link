import React from "react";

export default function Logo({ type = "small", text = "show" }) {
  const logoImageStyle = {
    small: {
      logo: `flex items-center text-xl font-bold  text-slate-700`,
      imageWidth: "w-20",
    },
    big: {
      logo: `flex items-center text-xl font-bold  text-slate-700`,
      imageWidth: "w-[10rem]",
    },
  };

  return (
    <div className={logoImageStyle[type].logo}>
      <img
        src="/webLogo.png"
        alt="webLogo"
        className={logoImageStyle[type].imageWidth}
      />
      {text === "show" ? (
        <span className=" hidden md:block">AccommodationLink</span>
      ) : (
        ""
      )}
    </div>
  );
}
