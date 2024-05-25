import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getAllProperties() {
  const properties = [];
  const querySnapshot = await getDocs(collection(db, "properties"));
  // console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    properties.push({ ...doc.data(), id: doc.id });
  });
  if (querySnapshot.empty)
    throw new Error(
      "Error: could not get properties , please check your internet connection",
    );
  return properties;
}
