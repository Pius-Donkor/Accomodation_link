import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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
export async function getProperty(id) {
  let property = {};
  const docRef = doc(db, "properties", id);
  const querySnapshot = await getDoc(docRef);
  if (!querySnapshot.exists())
    throw new Error(
      "Error: could not get properties , please check your internet connection",
    );
  property = querySnapshot.data();
  // console.log(property);
  return property;
}
