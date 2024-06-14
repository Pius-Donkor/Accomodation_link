import React from "react";

export default function ControlledInput({
  type = "text",
  register = () => {},
  required = "This field is required",
  field,
  disabled = false,
  validate = () => {},
  placeholder = "",
  fieldArrayName = "",
  index,
  value = "",
  valueName = "",
  onChange = () => {},
}) {
  const otherOptions = {
    accept: "image/*",
    multiple: true,
  };
  return (
    <input
      className={`${type !== "file" ? "text-md min-w-[15rem] rounded-3xl bg-[#2b28289a] px-2 py-1 text-[white] shadow-md outline-none" : " bg-blue-500"} `}
      id={field}
      value={value}
      disabled={disabled}
      onChange={onChange}
      {...(type === "file" ? otherOptions : {})}
      type={type}
      placeholder={placeholder}
      {...register(
        fieldArrayName ? `${fieldArrayName}.${index}` : valueName || field,
        {
          required: required,
          validate: validate,
        },
      )}
    />
  );
}
