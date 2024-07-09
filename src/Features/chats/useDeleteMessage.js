import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../Services/apiChats";

export default function useDeleteMessage() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteMessage,
    isPending: isDeletingMessage,
    error: messageDeleteError,
  } = useMutation({
    mutationFn: deleteMessageApi,
    mutationKey: ["chats"],
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { deleteMessage, isDeletingMessage, messageDeleteError };
}
