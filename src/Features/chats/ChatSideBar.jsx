import React from "react";

export default function ChatSideBar({
  children,
  setSearchConversations,
  chatSidebarInView,
}) {
  return (
    <div
      className={`absolute z-40 h-[100dvh] w-[100vw] border-r-2 border-r-slate-300 bg-slate-100  p-5  ${chatSidebarInView ? "md:left-0" : "left-[-100vw] md:left-[-70vw] "} transition-all duration-300 md:w-[70%] lg:relative lg:left-[none] lg:w-1/4 `}
    >
      <div className="flex items-center space-x-2 border-b pb-5">
        <input
          type="text"
          placeholder="Search"
          className="w-full border bg-slate-200  p-2 outline-none"
          onChange={(e) => setSearchConversations(e.target.value)}
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
