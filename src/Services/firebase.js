// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjasKcdbxLcUQPzXoMMuES6C5Dfkdm3p4",
  authDomain: "accommodationlink-17176.firebaseapp.com",
  projectId: "accommodationlink-17176",
  storageBucket: "accommodationlink-17176.appspot.com",
  messagingSenderId: "777789092412",
  appId: "1:777789092412:web:c37dc8c116d7ea99b84939",
  measurementId: "G-ENHYV1T7MD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
