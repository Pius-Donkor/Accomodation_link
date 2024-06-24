import React, { useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatArea from "./ChatArea";
import ChatInfoPanel from "./ChatInfoPanel";
import useGetUser from "../User/useGetUser";
import useGetChats from "./useGetChats";
import Conversation from "./Conversation";

// ChatUI component
export default function ChatBox() {
  const { userData, isLoading: userLoading, error: userError } = useGetUser();
  const { chats, chatsLoading, chatsError } = useGetChats(userData?.chatIDs);
  const [activeChatId, setActiveChatId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const loading = userLoading || chatsLoading;
  const errorState = userError || chatsError;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatSideBar>
        {loading && <p>loading chats ...</p>}
        {errorState && <p>loading chats ...</p>}
        {!loading &&
          !errorState &&
          chats.map((chat) => (
            <Conversation
              setOwnerName={setOwnerName}
              key={chat.propertyOwnerId}
              propertyOwnerId={chat.propertyOwnerId}
              lastMessage={chat.lastMessage}
              currentUserChatIDs={userData?.chatIDs}
              setActiveChatId={setActiveChatId}
            />
          ))}
      </ChatSideBar>

      {/* Main chat area */}
      <ChatArea activeChatId={activeChatId} ownerName={ownerName} />

      {/* Information panel */}
      <ChatInfoPanel />
    </div>
  );
}
