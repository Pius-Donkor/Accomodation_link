import React from "react";
import useGetOwner from "../User/useGetOwner";
import useSendUpdateMessage from "./useSendUpdateMessage";

export default function Conversation({
  // propertyOwnerId,
  lastMessage,
  currentUserChatIDs,
  setActiveChatId,
  setChatParticipantName,
  participants,
  currentUserId,
  isActiveConversationId,
  participantName,
  seen,
  lastSenderId,
}) {
  const { sendUpdateMessage } = useSendUpdateMessage();

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

    if (lastSenderId !== currentUserId) {
      sendUpdateMessage({
        chatId: activeChatId,
        hasRecipientSeen: true,
      });
    }
  }

  if (isLoadingOwner) return <p>loading...</p>;
  if (errorOwner) return <p>error...</p>;

  return (
    <li
      onClick={handleClickConversation}
      className={`relative flex cursor-pointer items-center space-x-3 border-b-2  border-b-slate-300 ${isActiveConversation ? "bg-green-200" : "bg-slate-200"} p-3 hover:bg-green-200`}
    >
      {/* checking to see if the recipient has seen the updated chat user has a  */}
      {!seen && lastSenderId !== currentUserId ? (
        ""
      ) : (
        <span className=" absolute right-2 top-2 rounded-full bg-red-400 p-3  "></span>
      )}

      {/* we check to find if the the the user has an avatar or we give him a generic one  */}
      {propertyOwner?.image ? (
        <img
          src={propertyOwner.image}
          alt="Avatar"
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <p className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400">
          {participantName
            .toUpperCase()
            .split(" ")
            .map((name) => name.slice(0, 1))
            .join("")}
        </p>
      )}
      <div>
        <p className="font-semibold">{propertyOwner?.userName}</p>
        <p>{lastMessage}...</p>
      </div>
    </li>
  );
}
