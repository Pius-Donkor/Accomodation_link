import React from "react";

export default function FormRow({ children, error, field = "" }) {
  return (
    <div>
      <label htmlFor={field}>
        {field.slice(0, 1).toUpperCase() + field.slice(1)} :
      </label>
      {children}
      {error && <p>{error}</p>}
    </div>
  );
}
