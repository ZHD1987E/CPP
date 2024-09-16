import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeVl5m13STqgirBXBEfaQvE_mXXYu6OFE",
    authDomain: "cryptothings-zhd1987e.firebaseapp.com",
    projectId: "cryptothings-zhd1987e",
    storageBucket: "cryptothings-zhd1987e.appspot.com",
    messagingSenderId: "297687411031",
    appId: "1:297687411031:web:640d400f6d4b0d6f093612"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };