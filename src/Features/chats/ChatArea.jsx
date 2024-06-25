import React, { useState } from "react";
import Button from "../../UI/Button";
import useSendUpdateMessage from "./useSendUpdateMessage";
import toast from "react-hot-toast";
export default function ChatArea({
  chatParticipantName,
  activeChatId,
  children,
  senderId,
}) {
  const [message, setMessage] = useState();
  const { isSending, messageError, sendUpdateMessage } = useSendUpdateMessage();
  function handleSendUpdateMessage() {
    sendUpdateMessage({
      senderId: senderId,
      chatId: activeChatId,
      content: message,
    });
  }
  return (
    <div className="flex w-1/2 flex-col justify-between bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b bg-slate-50 p-5  shadow-md">
        <h2>{chatParticipantName || "loading..."}</h2>
        {/* Status indicator here if needed */}
      </div>

      {/* Messages container */}
      <ul className="flex-grow space-y-4 overflow-y-auto p-5">
        {/* Repeat this `li` for each message in the conversation */}
        {children}
      </ul>

      {/* Message input */}
      <div className="flex items-center border-t p-5 ">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-md border border-green-300 p-2 outline-none   "
        />
        <Button onClick={handleSendUpdateMessage} disable={isSending}>
          send
        </Button>
      </div>
    </div>
  );
}
