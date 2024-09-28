import React from "react";

export default function EmptyMessage({ message }) {
  return (
    <div className="h-full w-full items-center justify-center ">
      <h1 className="text-5xl ">{message}</h1>
    </div>
  );
}
