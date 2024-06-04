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
      id={field}
      disabled={disabled}
      type={type}
      {...register(field, { required: required })}
    />
  );
}
