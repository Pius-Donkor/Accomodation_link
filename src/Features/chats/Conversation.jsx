import React from "react";
import useGetOwner from "../User/useGetOwner";

export default function Conversation({
  propertyOwnerId,
  lastMessage,
  currentUserChatIDs,
  setActiveChatId,
  setOwnerName,
}) {
  const { errorOwner, isLoadingOwner, propertyOwner } =
    useGetOwner(propertyOwnerId);

  // // Log statements for debugging
  // console.log(propertyOwner);
  // console.log("hello");

  // Check if propertyOwner and chatIDs exist before filtering
  const activeChatId = propertyOwner?.chatIDs?.filter((chatId) =>
    currentUserChatIDs.includes(chatId),
  )[0];
  function handleClickConversation() {
    setOwnerName(propertyOwner?.userName);
    setActiveChatId(activeChatId);
  }
  console.log(activeChatId);

  if (isLoadingOwner) return <p>loading...</p>;
  if (errorOwner) return <p>error...</p>;

  return (
    <li
      onClick={handleClickConversation}
      className="flex cursor-pointer items-center space-x-3 border-b-2 border-b-slate-300 bg-slate-200  p-3 hover:bg-gray-200"
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
