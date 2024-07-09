import React, { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatArea from "./ChatArea";
import ChatInfoPanel from "./ChatInfoPanel";
import useGetUser from "../User/useGetUser";
import useGetChats from "./useGetChats";
import Conversation from "./Conversation";
import Message from "./Message";
import { database } from "../../Services/firebase";
import { onValue, ref } from "firebase/database";

// ChatUI component
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  //  for the the input box
  const [message, setMessage] = useState();
  const [messageEditId, setMessageEditId] = useState("");
  const { userData, isLoading: userLoading, error: userError } = useGetUser();
  const { chats, chatsLoading, chatsError } = useGetChats(userData?.chatIDs);
  const [activeChatId, setActiveChatId] = useState("");
  const [chatParticipantName, setChatParticipantName] = useState("");
  // loading states
  const loading = userLoading || chatsLoading;
  const errorState = userError || chatsError;
  const isMessagesEmpty = messages.length === 0;
  // const { messages, messagesError, messagesLoading } =
  // useGetMessages(activeChatId);
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
        message={message}
        setMessage={setMessage}
        activeChatId={activeChatId}
        chatParticipantName={chatParticipantName}
        senderId={userData?.userId}
        setMessageEditId={setMessageEditId}
        messageEditId={messageEditId}
      >
        {isMessagesEmpty && <p>select a chat to start a conversation </p>}
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

      {/* Information panel */}
      <ChatInfoPanel />
    </div>
  );
}
