import React, { useEffect, useState } from "react";
import { storage, db } from "../Services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export default function AllUploads() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [users, setUsers] = useState([]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const imageArray = Array.from(fileList).reduce(
      (acc, file, index, array) => {
        if (index % 2 === 0) acc.push(array.slice(index, index + 2));
        return acc;
      },
      [],
    );

    setImages(imageArray);
  };

  async function imageUploads() {
    for (let i = 0; i < images.length; i++) {
      const files = images[i];
      const tempImgs = [];

      for (let j = 0; j < files.length; j++) {
        const file = files[j];
        const storageRef = ref(storage, `house_images/${file.name}`);

        try {
          const snapshot = await uploadBytes(storageRef, file);
          console.log(`Uploaded file ${j + 1} of batch ${i + 1}`);

          // Get download URL after successful upload
          const downloadURL = await getDownloadURL(snapshot.ref);
          tempImgs.push(downloadURL);
          console.log("File available at", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error.message);
        }
      }

      // Update state with new image URLs after each batch
      setImageURLs((prev) => [...prev, tempImgs]);
    }
    console.log("All image uploads finished");
  }
  async function dbUploads() {
    if (imageURLs.length === properties.length) {
      const newProperties = properties.map(function (property, i) {
        return { ...property, image: imageURLs[i] };
      });
      for (let i = 0; i < newProperties.length; i++) {
        // Add a new document with a generated id.
        const docRef = await addDoc(
          collection(db, "properties"),
          newProperties[i],
        );
        console.log("Document written with ID: ", docRef.id);
        await setDoc(doc(db, "opinions", docRef.id), opinions[i]);
        if (i < users.length) await addDoc(collection(db, "users"), users[i]);
      }
      console.log("database uploaded");
    }
  }
  // dbUploads();
  const handleUploads = async () => {
    await imageUploads();
  };
  useEffect(() => {
    dbUploads();
  }, [imageURLs]);
  useEffect(() => {
    fetch("http://localhost:5001/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));

    fetch("http://localhost:5001/opinions")
      .then((response) => response.json())
      .then((data) => setOpinions(data));

    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <input type="file" {...{}} multiple onChange={handleFileChange} />
      <button onClick={handleUploads}>Upload Photos</button>
    </div>
  );
}
