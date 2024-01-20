// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8gvfiDq8MsuqbGJUDK5Rvb8YGTtZ89oM",
  authDomain: "quora-clone-2f775.firebaseapp.com",
  projectId: "quora-clone-2f775",
  storageBucket: "quora-clone-2f775.appspot.com",
  messagingSenderId: "960743026793",
  appId: "1:960743026793:web:0aaab40470e56dce9df2f8",
  measurementId: "G-Y0EWV18L3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};
