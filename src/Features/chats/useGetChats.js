import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../Services/apiChats";

export default function useGetChats(chatIDs) {
  // console.log(chatIDs);

  const {
    data: chats = [],
    isLoading: chatsLoading,
    error: chatsError,
  } = useQuery({
    queryFn: () => getChats(chatIDs),
    queryKey: ["chats", chatIDs], // include chatIDs in the queryKey
    enabled: Boolean(chatIDs?.length),
  });

  return { chats, chatsLoading, chatsError };
}
