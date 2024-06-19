import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export async function setRating(data) {
  const { ratingId } = data;
  const updateData = { ...data };
  if (ratingId) {
    try {
      delete updateData.ratingId;
      await setDoc(doc(db, "ratings", ratingId), updateData);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  } else {
    try {
      delete updateData.ratingId;
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "ratings"), updateData);
      return docRef;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export async function getRatings(propertyId) {
  let ratings = [];
  try {
    console.log(propertyId);
    const q = query(
      collection(db, "ratings"),
      where("propertyId", "==", propertyId),
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (querySnapshot.empty) throw new Error("the is no such data");
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc);
      ratings.push({ ...doc.data(), ratingId: doc.id });
    });
    console.log(ratings);
    return ratings;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
