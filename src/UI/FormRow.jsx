import React from "react";

export default function FormRow({
  children,
  error,
  field = "",
  icon,
  childElement = "",
}) {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" w flex flex-col items-center gap-2 overflow-y-auto md:flex-row md:justify-between ">
        {childElement !== "button" && (
          <label htmlFor={field} className="flex items-center gap-1">
            {icon && <icon.icon className=" text-xl text-slate-600  " />}
            {field.slice(0, 1).toUpperCase() + field.slice(1)} :
          </label>
        )}
        {children}
      </div>
      {error && <p className="bg-[#eebbbb] text-right text-[red] ">{error}</p>}
    </div>
  );
}
