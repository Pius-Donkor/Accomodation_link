import React from "react";

export default function ChatArea({ ownerName, activeChatId, children }) {
  return (
    <div className="flex w-1/2 flex-col justify-between bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b bg-slate-50 p-5  shadow-md">
        <h2>{ownerName || "loading..."}</h2>
        {/* Status indicator here if needed */}
      </div>

      {/* Messages container */}
      <ul className="flex-grow space-y-4 overflow-y-auto p-5">
        {/* Repeat this `li` for each message in the conversation */}
        {children}
      </ul>

      {/* Message input */}
      <div className="border-t p-5">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full border p-2"
        />
      </div>
    </div>
  );
}
