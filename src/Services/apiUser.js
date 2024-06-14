import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function userSignUp(signUpData) {
  const { email, password } = signUpData;
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredentials.user;

  await sendEmailVerification(user);
  alert(
    "A verification link has been sent to your Email , please verify your Email to proceed",
  );

  // console.log(user);
  if (user) {
    const docRef = await addDoc(collection(db, "users"), {
      ...signUpData,
      userId: user.uid,
    });
    // console.log("Document written with ID: ", docRef.id);
  }
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

export async function userLogin(loginData) {
  const { email, password } = loginData;
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
}

export async function getUser(authId) {
  const q = query(collection(db, "users"), where("userId", "==", authId));
  let user = [];
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot, q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    user.push({ ...doc.data(), documentId: doc.id });
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(user);
  return user;
}
