import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Accordion({ heading, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="inline-flex flex-col justify-center gap-3 rounded-3xl bg-slate-50 shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between gap-20 px-3 py-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h1 className="text-xl font-semibold capitalize">{heading}</h1>
        {isOpen ? (
          <IoIosArrowUp className="text-xl" />
        ) : (
          <IoIosArrowDown className="text-xl" />
        )}
      </div>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ height }}
      >
        <div className="flex flex-col gap-4 px-2 py-2">{children}</div>
      </div>
    </div>
  );
}
