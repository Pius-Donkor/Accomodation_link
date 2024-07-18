import React, { useEffect, useRef, useState } from "react";
import Button from "../../UI/Button";
import useSendUpdateMessage from "./useSendUpdateMessage";
export default function ChatArea({
  chatParticipantName,
  activeChatId,
  children,
  senderId,
  setMessage,
  message,
  setMessageEditId,
  messageEditId,
}) {
  const { isSending, messageError, sendUpdateMessage } = useSendUpdateMessage();
  const isEditMode = Boolean(messageEditId);
  const [oldMessage, setOldMessage] = useState("");

  // for the  editing of message functionality
  useEffect(() => {
    setOldMessage(message);
  }, [messageEditId]);
  console.log(oldMessage, isEditMode, message);

  function handleSendUpdateMessage() {
    sendUpdateMessage(
      {
        messageId: messageEditId,
        senderId: senderId,
        chatId: activeChatId,
        content: message,
      },
      {
        onSuccess: () => {
          setMessageEditId("");
          setMessage("");
        },
      },
    );
  }
  return (
    <div className="flex w-1/2 flex-col justify-between bg-[#ffffff88] backdrop-blur-md  ">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b bg-slate-50 p-5  shadow-md">
        <h2>
          {(chatParticipantName && `chatting with : ${chatParticipantName} `) ||
            "select a chat participant"}
        </h2>
        {/* Status indicator here if needed */}
      </div>

      {/* Messages container */}
      <ul className="flex-grow space-y-4 overflow-y-auto p-5">
        {/* Repeat this `li` for each message in the conversation */}
        {children}
      </ul>

      {/* Message input */}
      <div className="flex items-center border-t p-5 ">
        <div className=" flex w-full flex-col gap-1 p-[10px] ">
          {isEditMode && (
            <p className="bg-slate-300 p-2"> Editing : {oldMessage}</p>
          )}
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="w-full rounded-md border border-green-300 p-2 outline-none   "
            value={message}
          />
        </div>

        <Button onClick={handleSendUpdateMessage} disable={isSending}>
          send
        </Button>
      </div>
    </div>
  );
}
