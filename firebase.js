// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9KvcK73x2L2LLVQ-9jHf4SuFJR5cRFic",
  authDomain: "dimitrov-finance-site-counter.firebaseapp.com",
  databaseURL: "https://dimitrov-finance-site-counter-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dimitrov-finance-site-counter",
  storageBucket: "dimitrov-finance-site-counter.firebasestorage.app",
  messagingSenderId: "378338381483",
  appId: "1:378338381483:web:4a755396620b1dbb3af1ee",
  measurementId: "G-F9XXKYZMRD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
