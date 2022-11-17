import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL42m2KUf4yhSfBnYvpjwCUTMI8yJYiNw",
  authDomain: "badasstodo-44bd3.firebaseapp.com",
  projectId: "badasstodo-44bd3",
  storageBucket: "badasstodo-44bd3.appspot.com",
  messagingSenderId: "431170547819",
  appId: "1:431170547819:web:c120247ea7c58191a5012e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}