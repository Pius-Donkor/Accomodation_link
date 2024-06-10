import React from "react";

export default function TextArea({
  register = () => {},
  required = "This field is required",
  field,
  disabled = false,
}) {
  return (
    <textarea
      className=" text-md min-h-20 min-w-[15rem] rounded-xl bg-[#2b28289a] px-2 py-1 text-[white] shadow-md outline-none  "
      id={field}
      disabled={disabled}
      {...register(field, { required: required })}
    />
  );
}
