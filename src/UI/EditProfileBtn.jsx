import React from "react";
import { RiEdit2Line } from "react-icons/ri";

export default function EditProfileBtn({ onClick }) {
  return (
    <span
      onClick={() => onClick()}
      role="button"
      className="absolute left-2 top-2 z-10 rounded-full bg-slate-100 p-1 shadow-lg transition-colors hover:bg-white"
    >
      <RiEdit2Line className="size-6" />
    </span>
  );
}
