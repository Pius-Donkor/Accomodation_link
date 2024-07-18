import React from "react";
import useGetOwner from "../User/useGetOwner";

export default function Conversation({
  // propertyOwnerId,
  lastMessage,
  currentUserChatIDs,
  setActiveChatId,
  setChatParticipantName,
  participants,
  currentUserId,
  isActiveConversationId,
}) {
  // getting the id of the other participant in communication with the user
  const [chatParticipant] = Object.keys(participants).filter(
    (id) => id !== currentUserId,
  );
  // actually we are not getting the owner here , we are just getting the other participants details
  const { errorOwner, isLoadingOwner, propertyOwner } =
    useGetOwner(chatParticipant);

  // getting the id of the chat which is currently active
  const activeChatId = propertyOwner?.chatIDs?.filter((chatId) =>
    currentUserChatIDs.includes(chatId),
  )[0];

  const isActiveConversation = isActiveConversationId === activeChatId;

  function handleClickConversation() {
    setChatParticipantName(propertyOwner?.userName);
    setActiveChatId(activeChatId);
  }

  if (isLoadingOwner) return <p>loading...</p>;
  if (errorOwner) return <p>error...</p>;

  return (
    <li
      onClick={handleClickConversation}
      className={`flex cursor-pointer items-center space-x-3 border-b-2 border-b-slate-300  ${isActiveConversation ? "bg-green-200" : "bg-slate-200"} p-3 hover:bg-green-200`}
    >
      {propertyOwner?.image ? (
        <img
          src={propertyOwner.image}
          alt="Avatar"
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <p className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400">
          {propertyOwner?.userName
            ? propertyOwner.userName
                .toUpperCase()
                .split(" ")
                .map((name) => name.slice(0, 1))
                .join("")
            : ""}
        </p>
      )}
      <div>
        <p className="font-semibold">{propertyOwner?.userName}</p>
        <p>{lastMessage}...</p>
      </div>
    </li>
  );
}
