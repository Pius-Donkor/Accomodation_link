import React, { cloneElement, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import useOutsideClick from "../hooks/useOutsideClick";

export default function ModalLittle({ children, buttonBg = "whitish" }) {
  const [displayChild, setDisplayChild] = useState(false);
  const { ref } = useOutsideClick(() => setDisplayChild(false));
  const buttonBgType = {
    whitish: " bg-transparent border-[2px] border-slate-500",
    greenish: " bg-green-300  ",
  };

  function handleOPenCloseModal() {
    setDisplayChild((prev) => !prev);
  }
  return (
    <div className="relative">
      <button
        className={` ${buttonBgType[buttonBg]} rounded-lg  px-[1px] py-0 `}
        onClick={handleOPenCloseModal}
      >
        <PiDotsThreeBold className=" text-xl text-black" />
      </button>

      {displayChild && (
        <div
          ref={ref}
          className=" absolute left-[-2rem] top-[-0.5rem] z-20 flex w-fit flex-col rounded-sm border border-[#00000046] bg-slate-50 shadow-2xl "
        >
          {cloneElement(children, {
            onCloseModal: () => setDisplayChild(false),
          })}
        </div>
      )}
    </div>
  );
}
