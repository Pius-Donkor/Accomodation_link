import React from "react";

export default function Message({ messageData, currentUserId }) {
  const { senderId, content, timestamp } = messageData;
  return (
    <>
      {senderId === currentUserId ? (
        <li className="flex justify-end ">
          <span className="inline-block rounded bg-green-600 px-4 py-2 text-white">
            {content}
          </span>
        </li>
      ) : (
        //  Use `justify-start` for received messages
        <li className="flex justify-start">
          <span className="inline-block rounded bg-gray-300 px-4 py-2 text-black">
            {content}
          </span>
        </li>
      )}
    </>
  );
}
