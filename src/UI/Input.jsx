import React from "react";

export default function Input({
  type = "text",
  register = () => {},
  required = "This field is required",
  field,
  disabled = false,
  validate = () => {},
  placeholder = "",
}) {
  return (
    <input
      className={` ${type !== "file" ? "text-md min-w-[15rem] rounded-3xl bg-[#2b28289a] px-2 py-1 text-[white] shadow-md outline-none" : " bg-blue-500"} `}
      id={field}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      {...register(field, { required: required, validate: validate })}
    />
  );
}
