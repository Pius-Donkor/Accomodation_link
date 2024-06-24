import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendUpdateMessage as sendUpdateMessageApi } from "../../Services/apiChats";

export default function useSendUpdateMessage() {
  const queryClient = useQueryClient();
  const {
    mutate: sendUpdateMessage,
    error: messageError,
    isPending: isSending,
  } = useMutation({
    mutationFn: sendUpdateMessageApi,
    mutationKey: ["messages"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    sendUpdateMessage,
    messageError,
    isSending,
  };
}
