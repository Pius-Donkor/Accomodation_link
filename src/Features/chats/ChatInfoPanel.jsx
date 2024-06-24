import React from "react";

export default function ChatInfoPanel() {
  return (
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
  );
}
