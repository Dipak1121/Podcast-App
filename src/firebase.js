// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6crmXtuxWO4e7mAUh0ugeQM9ZcoOWcwI",
  authDomain: "podcast-app-react-922f4.firebaseapp.com",
  projectId: "podcast-app-react-922f4",
  storageBucket: "podcast-app-react-922f4.appspot.com",
  messagingSenderId: "958437531109",
  appId: "1:958437531109:web:84c8c2de64016e814ee30c",
  measurementId: "G-18CJMLL9ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
