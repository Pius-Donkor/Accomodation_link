import React, { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatArea from "./ChatArea";
import ChatInfoPanel from "./ChatInfoPanel";
import useGetUser from "../User/useGetUser";
import useGetChats from "./useGetChats";
import Conversation from "./Conversation";
import Message from "./Message";
import { getChat } from "../../Services/apiChats";

// ChatUI component
export default function ChatBox() {
  const { userData, isLoading: userLoading, error: userError } = useGetUser();
  const { chats, chatsLoading, chatsError } = useGetChats(userData?.chatIDs);
  const [activeChatId, setActiveChatId] = useState("");
  const [chatParticipantName, setChatParticipantName] = useState("");
  const loading = userLoading || chatsLoading;
  const errorState = userError || chatsError;
  useEffect(() => {
    getChat(activeChatId);
  }, [activeChatId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatSideBar>
        {loading && <p>loading chats ...</p>}
        {errorState && <p>loading chats ...</p>}
        {!loading &&
          !errorState &&
          chats.map((chat, i) => (
            <Conversation
              setChatParticipantName={setChatParticipantName}
              key={i}
              // propertyOwnerId={chat.propertyOwnerId}
              lastMessage={chat.lastMessage}
              currentUserChatIDs={userData?.chatIDs}
              currentUserId={userData?.userId}
              setActiveChatId={setActiveChatId}
              participants={chat.participants}
            />
          ))}
      </ChatSideBar>

      {/* Main chat area */}
      <ChatArea
        activeChatId={activeChatId}
        chatParticipantName={chatParticipantName}
        senderId={userData?.userId}
      >
        <Message />
      </ChatArea>

      {/* Information panel */}
      <ChatInfoPanel />
    </div>
  );
}
