import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBE1mG7hi-Hy4Qp5uJGX2KGtV_2_5oGQU8",
  authDomain: "project-todo-aa926.firebaseapp.com",
  projectId: "project-todo-aa926",
  storageBucket: "project-todo-aa926.appspot.com",
  messagingSenderId: "329510218836",
  appId: "1:329510218836:web:abaa95b9026cce7e2911c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);

export default db;