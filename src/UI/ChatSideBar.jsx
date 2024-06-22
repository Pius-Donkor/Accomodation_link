import React from "react";

export default function ChatSideBar() {
  return (
    <div className="w-1/4 bg-white p-5">
      <div className="flex items-center space-x-2 border-b pb-5">
        <input type="text" placeholder="Search" className="w-full border p-2" />
      </div>
      {/* List of conversations */}
      <ul>
        {/* Repeat this `li` for each conversation */}
        <li className="flex cursor-pointer items-center space-x-3 p-3 hover:bg-gray-200">
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Name</p>
            <p>Last message...</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
