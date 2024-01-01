// Firestore database setup
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db = false;

const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_apiKey,
      authDomain: import.meta.env.VITE_authDomain,
      projectId: import.meta.env.VITE_projectId,
      storageBucket: import.meta.env.VITE_storageBucket,
      messagingSenderId: import.meta.env.VITE_messagingSenderId,
      appId: import.meta.env.VITE_appId,
    };

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }

  return db;
};

export default getDb;
