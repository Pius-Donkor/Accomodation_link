import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export async function userSignUp(signUpData) {
  const {
    email,
    password,
    userId,
    documentId,
    contact,
    role,
    userName,
    whatsAppContact,
    location,
    oldPassword,
  } = signUpData;

  let user;
  if (userId) {
    user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      // Re-authenticate the user
      await reauthenticateWithCredential(user, credential);

      // Update the email and password
      await updateEmail(user, email);
      await updatePassword(user, password);

      // Update the Firestore document
      await setDoc(doc(db, "users", documentId), {
        email,
        password,
        userId,
        contact,
        role,
        userName,
        whatsAppContact,
        location,
      });
    } catch (error) {
      console.error("Error re-authenticating or updating user: ", error);
    }
  } else {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      user = userCredentials.user;

      // Send email verification
      await sendEmailVerification(user);
      alert(
        "A verification link has been sent to your Email, please verify your Email to proceed",
      );
      console.log(user);
      if (user) {
        await addDoc(collection(db, "users"), {
          email,
          password,
          contact,
          role,
          userName,
          whatsAppContact,
          location,
          userId: user.uid,
        });
      }
    } catch (error) {
      console.error("Error signing up user: ", error);
      throw new Error(error.message);
    }
  }
}

export async function userLogin(loginData) {
  const { email, password } = loginData;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (!userCredential)
      throw new Error(
        "sorry something while logging in , please check your internet connection and try again ",
      );
    // Signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logout() {
  await signOut(auth);
}

// getting all users
export async function getAllUsers() {
  const users = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    users.push({ ...doc.data(), userId: doc.id });
  });

  return users;
}

export async function getUser(authId) {
  try {
    const q = query(collection(db, "users"), where("userId", "==", authId));
    let user = [];
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot, q);
    if (querySnapshot.empty)
      throw new Error(
        "sorry , user details cannot be obtained please check your internet connection ",
      );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      user.push({ ...doc.data(), documentId: doc.id });
      // console.log(doc.id, " => ", doc.data());
    });
    // console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getPropertyOwner(ownerId) {
  console.log(ownerId);
  try {
    const q = query(collection(db, "users"), where("userId", "==", ownerId));
    let user = [];
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot, q);
    if (querySnapshot.empty)
      throw new Error(
        "sorry , user details cannot be obtained please check your internet connection ",
      );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      user.push({ ...doc.data(), documentId: doc.id });
      // console.log(doc.id, " => ", doc.data());
    });
    // console.log(user);
    // console.log(user);
    const [
      {
        userName,
        contact,
        location,
        chatIDs,
        documentId,
        email,
        userId,
        rentRequests,
        role,
        tenantTo,
        profileImage,
      },
    ] = user;
    return {
      userName,
      contact,
      location,
      chatIDs: chatIDs?.length ? chatIDs : [],
      documentId,
      email,
      userId,
      rentRequests,
      role,
      tenantTo,
      profileImage,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

// reset user password
export async function resetForgottenPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function updateUser(data) {
  const washingtonRef = doc(db, "users", data.documentId);
  await updateDoc(washingtonRef, {
    password: data.password,
  });
}

//  update the user profile
export async function updateUserProfile({
  id,
  profileImage,
  previousImageName,
}) {
  const storageRef = ref(storage, `profile_images/${profileImage.name}`);
  const snapshot = await uploadBytes(storageRef, profileImage);
  try {
    if (previousImageName) {
      // Create a reference to the file to delete
      const desertRef = ref(storage, `profile_images/${previousImageName}`);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("file deleted successfully");
        })
        .catch((error) => {
          console.log(error.message);
          throw new Error(
            "could not upload profile image, check your internet connection ",
          );
        });
    }
    // Get download URL after successful upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    if (typeof downloadURL !== "string") {
      throw new Error(" upload Error");
    }
    const washingtonRef = doc(db, "users", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      profileImage: downloadURL,
      profileImageName: profileImage.name,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
// ADMIN FUNCTIONS
export async function updateUserStatus(data) {
  const { id, status } = data;
  const washingtonRef = doc(db, "users", id);
  await updateDoc(washingtonRef, { status });
}
