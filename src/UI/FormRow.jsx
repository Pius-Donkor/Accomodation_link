import React from "react";

export default function FormRow({ children, error, field = "", icon }) {
  return (
    <div className=" flex items-center justify-between gap-2">
      <label htmlFor={field} className="flex items-center gap-1">
        {icon && <icon.icon className=" text-xl text-slate-600  " />}
        {field.slice(0, 1).toUpperCase() + field.slice(1)} :
      </label>
      {children}
      {error && <p>{error}</p>}
    </div>
  );
}
