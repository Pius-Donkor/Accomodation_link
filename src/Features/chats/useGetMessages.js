import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMessages as getMessagesApi } from "../../Services/apiChats";

export default function useGetMessages(chatId) {
  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
  } = useQuery({
    queryFn: () => getMessagesApi(chatId),
    queryKey: ["messages", chatId], // include chatIDs in the queryKey
    enabled: Boolean(chatId),
  });

  return { messages, messagesLoading, messagesError };
}
