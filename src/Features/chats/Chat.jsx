import React from "react";
import ChatSideBar from "../../UI/ChatSideBar";

// ChatUI component
const Chat = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatSideBar />

      {/* Main chat area */}
      <div className="flex w-1/2 flex-col justify-between bg-white">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2>Name</h2>
          {/* Status indicator here if needed */}
        </div>

        {/* Messages container */}
        <ul className="flex-grow space-y-4 overflow-y-auto p-5">
          {/* Repeat this `li` for each message in the conversation */}
          <li className="flex justify-end">
            <span className="inline-block rounded bg-blue-500 px-4 py-2 text-white">
              Message content...
            </span>
          </li>
          {/* Use `justify-start` for received messages */}
          <li className="flex justify-start">
            <span className="inline-block rounded bg-gray-300 px-4 py-2 text-black">
              Message content...
            </span>
          </li>
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

      {/* Information panel */}
      <div className="w-1/4 bg-white p-5">
        <div className="flex flex-col items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-20 w-20 rounded-full"
          />
          <h3 className="mt-4 font-semibold">User Name</h3>
          <p>Email address</p>
          {/* Thumbnails of shared media */}
          <div className="mt-4 flex space-x-2">
            {/* Repeat this `img` for each shared media thumbnail */}
            <img src="/media.jpg" alt="Media" className="h-10 w-10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
