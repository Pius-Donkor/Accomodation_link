import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getAllProperties() {
  try {
    const properties = [];
    const querySnapshot = await getDocs(collection(db, "properties"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      properties.push({ ...doc.data(), id: doc.id });
    });
    return properties;
  } catch (error) {
    throw new Error(error.message);
  }
}
