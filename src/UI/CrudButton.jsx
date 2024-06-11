import React from "react";
export default function CrudButton({ children, Icon, onClick = () => {} }) {
  return (
    <span
      onClick={onClick}
      role="button"
      className="flex items-center justify-center gap-1 border-b-2 border-[#00000046] bg-slate-100 p-1 transition-colors duration-300 hover:bg-slate-300"
    >
      <Icon className="text-lg" /> {children}
    </span>
  );
}
