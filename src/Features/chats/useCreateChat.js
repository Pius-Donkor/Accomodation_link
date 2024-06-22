import React from "react";
import { createChat as createChatApi } from "../../Services/apiChats";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateChat() {
  const queryClient = useQueryClient();
  const {
    mutate: createChat,
    error: createChatError,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createChatApi,
    mutationKey: ["chats"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createChat, createChatError, isCreating };
}
