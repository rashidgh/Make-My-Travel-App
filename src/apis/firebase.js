// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Authentication
import { getAuth } from 'firebase/auth';
// firebase database
import {getFirestore} from 'firebase/firestore'
// firebase storage
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMXkl9EZFKYuhd_GRmRtyXzQAc4x2ZBXs",
  authDomain: "reduxproject-420a3.firebaseapp.com",
  projectId: "reduxproject-420a3",
  storageBucket: "reduxproject-420a3.appspot.com",
  messagingSenderId: "946959140130",
  appId: "1:946959140130:web:5144482558c78190dc517b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export let auth = getAuth(firebaseApp);
export let db = getFirestore(firebaseApp);
export let storage = getStorage(firebaseApp);

export default firebaseApp;

