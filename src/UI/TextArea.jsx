import React from "react";

export default function TextArea({
  register = {},
  required = "This field is required",
  field,
  disabled = false,
  children,
}) {
  return (
    <textarea
      id={field}
      disabled={disabled}
      {...register(field, { required: required })}
    >
      {children}
    </textarea>
  );
}
