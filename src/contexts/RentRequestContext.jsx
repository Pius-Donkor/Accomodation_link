import { onValue, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Services/firebase";
import useGetAuthUser from "../Features/User/useGetAuthUser";
import useGetUser from "../Features/User/useGetUser";

const RentRequestContext = createContext();
function RentRequestProvider({ children }) {
  const { authUserId } = useGetAuthUser();
  const { userData } = useGetUser();
  const [rentRequests, setRentRequests] = useState([]);
  const userNewRentRequests = rentRequests.length
    ? rentRequests?.filter(
        (request) =>
          request.requestToId === authUserId && request.status === "pending",
      )
    : [];
  const allUserRequests = rentRequests.length
    ? rentRequests?.filter((request) =>
        userData?.rentRequests.includes(request.id),
      )
    : [];
  let userHasRequests = Boolean(userNewRentRequests.length);
  useEffect(() => {
    const chatRef = ref(database, `rentalRequests/`);
    onValue(chatRef, (snapshot) => {
      const rentRequestList = [];
      const data = snapshot.val();
      for (let id in data) {
        rentRequestList.push({ id, ...data[id] });
      }
      if (JSON.stringify(rentRequestList) === JSON.stringify(rentRequests))
        return;
      setRentRequests(rentRequestList);
    });
  }, [rentRequests]);

  return (
    <RentRequestContext.Provider
      value={{
        rentRequests,
        userNewRentRequests,
        userHasRequests,
        allUserRequests,
      }}
    >
      {children}
    </RentRequestContext.Provider>
  );
}

function useRentRequestContext() {
  const context = useContext(RentRequestContext);
  if (context === undefined)
    throw new Error(
      "RentRequestContext can only be used under RentRequestContext.Provider",
    );
  return context;
}

export { RentRequestProvider, useRentRequestContext };
