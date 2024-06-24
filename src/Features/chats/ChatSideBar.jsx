import React from "react";

export default function ChatSideBar({ children }) {
  return (
    <div className="w-1/4 border-r-2 border-r-slate-300 bg-slate-100 p-5">
      <div className="flex items-center space-x-2 border-b pb-5">
        <input
          type="text"
          placeholder="Search"
          className="w-full border bg-slate-200  p-2 outline-none"
        />
      </div>
      {/* List of conversations */}
      <ul>
        {/* Repeat this `li` for each conversation */}
        {children}
      </ul>
    </div>
  );
}
