import React from "react";

export default function Form({
  children,
  onSubmit = () => {},
  handleSubmit = () => {},
  onError = () => {},
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className=" space-y-4">
      {children}
    </form>
  );
}
