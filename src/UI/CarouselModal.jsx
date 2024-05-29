import React from "react";

export default function CarouselModal({ isOpen, onClose, children }) {
  //   const { ref } = useOutsideClick(onClose, false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md">
      <div className="relative mt-[20rem] w-[60rem] rounded-md bg-white p-4 ">
        <button
          className="absolute right-2 top-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
