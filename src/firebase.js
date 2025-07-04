import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7l5VMZRu4E14ju7h2O7O6KOEX1OAPTo8",
  authDomain: "stylesence-bbf03.firebaseapp.com",
  projectId: "stylesence-bbf03",
  storageBucket: "stylesence-bbf03.appspot.com", // corrected typo
  messagingSenderId: "596898646084",
  appId: "1:596898646084:web:58ca3af907c48408a01411",
  measurementId: "G-2GGD4PETBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
