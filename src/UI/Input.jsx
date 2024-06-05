import React from "react";

export default function Input({
  type = "text",
  register = {},
  required = "This field is required",
  field,
  disabled = false,
}) {
  return (
    <input
      className=" text-md min-w-[15rem] rounded-3xl bg-[#2b28289a] px-2 py-1 text-[white] shadow-md outline-none"
      id={field}
      disabled={disabled}
      type={type}
      {...register(field, { required: required })}
    />
  );
}
