import { push, ref, child, update, set, onValue, get } from "firebase/database";
import { database, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function createChat(chatData) {
  const { usersDetails } = chatData;

  let chatId = "";
  let dataToStore = { ...chatData };
  console.log(usersDetails);
  delete dataToStore.usersDetails;
  console.log(usersDetails);
  try {
    const messagesRef = ref(database, "chats/");
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, dataToStore);

    chatId = newMessageRef.key;
    console.log(chatId);

    // storing the chat id of the new chat into the user collection of both users

    for (let i = 0; i < usersDetails.length; i++) {
      const userRef = doc(db, "users", usersDetails[i].documentId);
      await updateDoc(userRef, {
        chatIDs: usersDetails[i].chatIDs?.length
          ? [...usersDetails[i].chatIDs, chatId]
          : [chatId],
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function sendUpdateMessage(postData) {
  const { senderId, content, messageId } = postData;
  const updates = {};
  if (messageId) {
    updates["/chats/messages/" + messageId] = content;
  } else {
    const messagesRef = ref(database, "chats/messages");
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      senderId,
      content,
      timestamp: Date.now(),
    });
    updates["/chats/lastMessage"] = content;
  }

  return update(ref(database), updates);
}

// export async function getChats(chatIDs) {
//   let chats = [];
//   try {
//     for (let i = 0; i < chatIDs?.length; i++) {
//       const starCountRef = ref(database, "chats/" + chatIDs[i]);
//       console.log(starCountRef);
//       onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//         chats.push(data);
//       });
//     }
//     console.log(chats);
//     return chats;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// }
export async function getChats(chatIDs) {
  try {
    const chatPromises = chatIDs.map((chatID) => {
      const chatRef = ref(database, "chats/" + chatID);
      return get(chatRef).then((snapshot) => snapshot.val());
    });

    const chats = await Promise.all(chatPromises);
    console.log(chats);
    return chats;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
