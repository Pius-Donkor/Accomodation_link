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
import { auth, db } from "./firebase";

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

export async function getUser(authId) {
  try {
    const q = query(collection(db, "users"), where("userId", "==", authId));
    let user = [];
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, q);
    if (querySnapshot.empty)
      throw new Error(
        "sorry , user details cannot be obtained please check your internet connection ",
      );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      user.push({ ...doc.data(), documentId: doc.id });
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

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

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    password: data.password,
  });
}
