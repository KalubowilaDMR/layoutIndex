// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnJPhoPaM4eQb0p6nKscjHIbQwo48pqUM",
  authDomain: "layoutindex-2c321.firebaseapp.com",
  projectId: "layoutindex-2c321",
  storageBucket: "layoutindex-2c321.appspot.com",
  messagingSenderId: "905150525563",
  appId: "1:905150525563:web:19966dd9157679fe74f2de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
