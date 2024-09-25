import { push, ref, set, update } from "firebase/database";
import { database, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

// sending a request
export async function createUpdateRentRequest({
  requestFromId,
  requestToId,
  status,
  propertyId,
  requestFromDocId,
  requestToDocId,
  oldRequestsOwner,
  oldRequestsRequester,
  oldRequestsProperty,
  oldRequestId,
  price_offered,
  isRequestedBefore,
}) {
  let requestId = "";
  const updates = {};
  try {
    if (isRequestedBefore) {
      updates["/rentalRequests/" + oldRequestId + "/status"] = status;
      updates["/rentalRequests/" + oldRequestId + "/price_offered"] =
        price_offered;
      return update(ref(database), updates);
    } else {
      const requestRef = ref(database, "rentalRequests/");
      const newRequestRef = push(requestRef);
      await set(newRequestRef, {
        requestFromId,
        requestToId,
        status,
        propertyId,
        price_offered,
      });

      requestId = newRequestRef.key;
      console.log(requestId);
    }

    const propertyRef = doc(db, "properties", propertyId);
    await updateDoc(propertyRef, {
      rentRequests: oldRequestsProperty?.length
        ? [...oldRequestsProperty, requestId]
        : [requestId],
    });

    const requesterRef = doc(db, "users", requestFromDocId);
    await updateDoc(requesterRef, {
      rentRequests: oldRequestsRequester?.length
        ? [...oldRequestsRequester, requestId]
        : [requestId],
    });

    const ownerRef = doc(db, "users", requestToDocId);
    await updateDoc(ownerRef, {
      rentRequests: oldRequestsOwner?.length
        ? [...oldRequestsOwner, requestId]
        : [requestId],
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function receiveRequest({ requestId, status }) {
  const updates = {};
  try {
    updates["/rentalRequests/" + requestId + "/status"] = status;
    await update(ref(database), updates);
  } catch (error) {
    throw new Error("could not update the request");
  }
}
