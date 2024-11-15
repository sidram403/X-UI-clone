// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRBASE_API_KEY,
  authDomain: "news-paper-92612.firebaseapp.com",
  projectId: "news-paper-92612",
  storageBucket: "news-paper-92612.appspot.com",
  messagingSenderId: "1044456612705",
  appId: "1:1044456612705:web:6d883ecae7cc8a5a245b20",
  measurementId: "G-DK3T96HL7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);