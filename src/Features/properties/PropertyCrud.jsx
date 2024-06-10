import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../UI/Button";
export default function PropertyCrud() {
  const [displayCrud, setDisplayCrud] = useState(false);
  const closeCrud = () => setDisplayCrud(false);
  function handleDisplayCrud() {
    setDisplayCrud((prev) => !prev);
  }
  const { ref } = useOutsideClick(closeCrud);
  return (
    <div className="relative">
      <Button type="transparent" onClick={handleDisplayCrud}>
        <PiDotsThreeOutlineVerticalBold className=" text-xl" />
      </Button>

      {displayCrud && (
        <div
          ref={ref}
          className=" absolute right-[-5rem] top-[-0.5rem] z-20 flex w-fit flex-col rounded-sm border border-[#00000046] bg-slate-50 shadow-2xl "
        >
          <span
            role="button"
            className="ho flex items-center justify-center gap-1 border-b-2 border-[#00000046] bg-slate-100 p-1 transition-colors duration-300 hover:bg-slate-300"
          >
            <MdDelete className="text-lg" /> Delete
          </span>
          <span
            role="button"
            className="flex items-center justify-center gap-1 border-b-2 border-[#00000046] bg-slate-100 p-1 transition-colors duration-300 hover:bg-slate-300"
          >
            <MdModeEditOutline className="text-lg" /> Edit
          </span>
        </div>
      )}
    </div>
  );
}
