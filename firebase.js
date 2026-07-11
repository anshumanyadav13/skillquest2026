import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn2zYgbD3LqawWMGVmGLWEwRs4ZNu-iiI",
  authDomain: "skillquestrj2026.firebaseapp.com",
  projectId: "skillquestrj2026",
  storageBucket: "skillquestrj2026.firebasestorage.app",
  messagingSenderId: "180834121471",
  appId: "1:180834121471:web:c5fa92f0a5c34d8319feca",
  measurementId: "G-TWML8ZN1Q4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveScore(score){

    const name = localStorage.getItem("name");
    const roll = localStorage.getItem("roll");

    await addDoc(collection(db,"scores"),{
        name:name,
        roll:roll,
        score:score,
        time:new Date()
    });

}