import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_FIREBASE_URL,
  authDomain: import.meta.env.VITE_AUTHDOMAIN_URL,
  projectId: import.meta.env.VITE_PROJECTID_URL,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET_URL,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID_URL,
  appId: import.meta.env.VITE_APPID_URL,
  measurementId: import.meta.env.VITE_MEASUREMENTID_URL,
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
