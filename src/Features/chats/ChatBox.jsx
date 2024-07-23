import React, { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatArea from "./ChatArea";
import useGetUser from "../User/useGetUser";
import useGetChats from "./useGetChats";
import Conversation from "./Conversation";
import Message from "./Message";
import { database } from "../../Services/firebase";
import { onValue, ref } from "firebase/database";
import HomeBack from "../../UI/HomeBack";
import { useSearchParams } from "react-router-dom";

// ChatUI component
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  //  for the input box
  const [message, setMessage] = useState("");
  const [messageEditId, setMessageEditId] = useState("");
  const { userData, isLoading: userLoading, error: userError } = useGetUser();
  const [searchConversation, setSearchConversations] = useState("");
  const { chats, chatsLoading, chatsError } = useGetChats(userData?.chatIDs);
  const [activeChatId, setActiveChatId] = useState("");
  const [chatParticipantName, setChatParticipantName] = useState("");
  const [searchParams] = useSearchParams();

  let displayedConversations = chats?.length
    ? chats.filter((chat) =>
        chat.participantsDetails.some(
          (participant) =>
            participant.name
              .toLowerCase()
              .includes(searchConversation.toLowerCase()) &&
            participant.id !== userData?.userId,
        ),
      )
    : [];

  // Loading states
  const loading = userLoading || chatsLoading;
  const errorState = userError || chatsError;
  const isMessagesEmpty = messages.length === 0;

  useEffect(() => {
    if (activeChatId) {
      const chatRef = ref(database, `chats/${activeChatId}/messages`);
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const messageList = [];
        for (let id in data) {
          messageList.push({ id, ...data[id] });
        }
        setMessages(messageList);
      });
    }
  }, [activeChatId]);

  // Setting the active chat ID from URL parameters
  useEffect(() => {
    const chatId = searchParams.get("ownerChatId") || "";
    setActiveChatId(chatId);
  }, [searchParams]);

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 bg-[url('/chat-bg.jpeg')] bg-cover bg-no-repeat">
      {/* Home and back buttons */}
      <HomeBack topCorner={true} isRow={true} />

      {/* Sidebar */}
      <ChatSideBar setSearchConversations={setSearchConversations}>
        {loading && <p>Loading chats...</p>}
        {errorState && (
          <p className="bg-red-100 p-2 text-red-900">
            Error loading chats: {errorState.message}
          </p>
        )}
        {!loading && !errorState && chats?.length && !chatsLoading ? (
          displayedConversations.map((chat, i) => (
            <Conversation
              setChatParticipantName={setChatParticipantName}
              key={i}
              isActiveConversationId={activeChatId}
              lastMessage={chat.lastMessage}
              currentUserChatIDs={userData?.chatIDs}
              currentUserId={userData?.userId}
              setActiveChatId={setActiveChatId}
              participants={chat.participants}
              lastSenderId={chat.lastSenderId}
              seen={chat.seen}
            />
          ))
        ) : (
          <p>
            {errorState || loading ? "" : "You have no chats available yet"}{" "}
          </p>
        )}
      </ChatSideBar>

      {/* Main chat area */}
      <ChatArea
        message={message}
        setMessage={setMessage}
        activeChatId={activeChatId}
        chatParticipantName={chatParticipantName}
        senderId={userData?.userId}
        setMessageEditId={setMessageEditId}
        messageEditId={messageEditId}
      >
        {isMessagesEmpty && <p>Select a chat to start a conversation</p>}
        {!isMessagesEmpty &&
          messages.map((messageObj) => (
            <Message
              setMessage={setMessage}
              key={messageObj.id}
              messageData={messageObj}
              currentUserId={userData?.userId}
              setMessageEditId={setMessageEditId}
              chatId={activeChatId}
            />
          ))}
      </ChatArea>
    </div>
  );
}
