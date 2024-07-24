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
  setChatSidebarInView,
  chatSidebarInView,
}) {
  const { isSending, messageError, sendUpdateMessage } = useSendUpdateMessage();
  const isEditMode = Boolean(messageEditId);
  const [oldMessage, setOldMessage] = useState("");

  // for the  editing of message functionality
  useEffect(() => {
    setOldMessage(message);
  }, [messageEditId]);
  console.log(oldMessage, isEditMode, message);
  console.log(activeChatId);
  function handleSendUpdateMessage() {
    sendUpdateMessage(
      {
        messageId: messageEditId,
        senderId: senderId,
        chatId: activeChatId,
        content: message,
        seen: false,
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
    <div className="absolute  flex h-full w-[100vw] flex-col  justify-between   bg-[#ffffff88] backdrop-blur-md lg:relative lg:w-1/2 ">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b bg-slate-50 p-5  shadow-md">
        <h2>
          {(chatParticipantName && (
            <div className="flex items-center gap-3 rounded-3xl bg-[#cbf1de] pr-3 font-semibold text-[#43534f]  ">
              <span className="rounded-3xl  bg-[#accebd] px-3 py-2">
                chatting with :{" "}
              </span>{" "}
              {chatParticipantName}
            </div>
          )) ||
            "select a chat participant"}
        </h2>
        {/* Status indicator here if needed */}
        <div className="lg:hidden">
          <Button
            type="reddish"
            onClick={() => setChatSidebarInView((prev) => !prev)}
          >
            view chats
          </Button>
        </div>
      </div>

      {/* Messages container */}
      <ul className="flex-grow space-y-4 overflow-y-auto p-5">
        {/* Repeat this `li` for each message in the conversation */}
        {children}
      </ul>

      {/* Message input */}

      {activeChatId && (
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
      )}
    </div>
  );
}
