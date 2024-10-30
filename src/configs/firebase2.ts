// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBbYNKDc0h_EP5MhqBXoAB2e8CREU6dAfY",
  authDomain: "edu-master-836ce.firebaseapp.com",
  projectId: "edu-master-836ce",
  storageBucket: "edu-master-836ce.appspot.com",
  messagingSenderId: "304146839060",
  appId: "1:304146839060:web:c45cb24b6cdba23e96d901",
  measurementId: "G-JX105B1JYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, signInWithCredential, GoogleAuthProvider };
