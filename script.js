import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc
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

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc
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

window.startQuiz = async function(){

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();

if (!/^\d{4}$/.test(roll)) {
    alert("Please enter a valid 4-digit Roll Number.");
    return;
}
    let cls = document.getElementById("class").value;

    if(name==""){
        alert("Please enter your name.");
        return;
    }

    if(!/^[A-Za-z ]+$/.test(name)){
        alert("Name should contain only letters.");
        return;
    }


    const studentRef = doc(db, "scores", roll);
    const studentDoc = await getDoc(studentRef);

    if(studentDoc.exists()){
        alert("❌ This Roll Number has already attempted the quiz.");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("roll", roll);
    localStorage.setItem("class", cls);

    window.location.href = "rules.html";

}