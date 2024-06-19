import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function setRating(data) {
  const { ratingId } = data;

  if (ratingId) {
    try {
      const updateData = data.slice;
      delete updateData.ratingId;
      await setDoc(doc(db, "ratings", ratingId), updateData);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  } else {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "ratings"), data);
      return docRef;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
