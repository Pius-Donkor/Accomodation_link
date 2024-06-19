import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

let tempImgs = [];
let tempImgNames = [];

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

export async function uploadImages(images) {
  if (typeof images[0] === "string") return;
  for (let i = 0; i < images.length; i++) {
    const storageRef = ref(storage, `house_images/${images[i].name}`);

    try {
      const snapshot = await uploadBytes(storageRef, images[i]);

      // Get download URL after successful upload
      const downloadURL = await getDownloadURL(snapshot.ref);
      tempImgs.push(downloadURL);
      tempImgNames.push(images[i].name);

      console.log("File available at", downloadURL);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export async function createEditProperties(propertyData) {
  const { id, image } = propertyData;
  console.log(propertyData);
  await uploadImages(image);
  if (id) {
    try {
      // Add a new document in collection "cities"
      const newProperty = { ...propertyData };
      delete newProperty.id;
      await setDoc(doc(db, "properties", id), newProperty);
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    console.log(tempImgs, serverTimestamp());
    console.log({
      ...propertyData,
      images: tempImgs,
      createdAt: serverTimestamp(),
    });
    try {
      const docRef = await addDoc(collection(db, "properties"), {
        ...propertyData,
        image: tempImgs,
        imageNames: tempImgNames,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export async function deleteProperty({ id, imageNames }) {
  try {
    if (imageNames) {
      for (let i = 0; i < imageNames.length; i++) {
        // Create a reference to the file to delete
        const desertRef = ref(storage, `house_images/${imageNames[i]}`);
        // Delete the file
        await deleteObject(desertRef);
      }
    }
    await deleteDoc(doc(db, "properties", id));
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
