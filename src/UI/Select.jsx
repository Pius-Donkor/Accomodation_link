import React from "react";

export default function Select({
  children,
  type = "text",
  register = {},
  required = "This field is required",
  field,
  disabled = false,
}) {
  return (
    <select
      id={field}
      disabled={disabled}
      type={type}
      {...register(field, { required: required })}
    >
      {children}
    </select>
  );
}
