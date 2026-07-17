import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAn2zYgbD3LqawWMGVmGLWEwRs4ZNu-iiI",
    authDomain: "skillquestrj2026.firebaseapp.com",
    projectId: "skillquestrj2026",
    storageBucket: "skillquestrj2026.firebasestorage.app",
    messagingSenderId: "180834121471",
    appId: "1:180834121471:web:c5fa92f0a5c34d8319feca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const winnerA = document.getElementById("winnerA");
const winnerB = document.getElementById("winnerB");

async function loadWinners() {

    const snapshot = await getDocs(collection(db, "scores"));

    let classA = [];
    let classB = [];

    snapshot.forEach(doc => {
        const data = doc.data();

        if (data.classroom === "Class A") {
            classA.push(data);
        } else if (data.classroom === "Class B") {
            classB.push(data);
        }
    });

    classA.sort((a, b) => b.score - a.score);
    classB.sort((a, b) => b.score - a.score);

    if (classA.length > 0) {
        winnerA.innerHTML = `
        <div class="leader-card">
            <h2>🥇 Winner - Class A</h2>
            <h3>${classA[0].roll} - ${classA[0].name}</h3>
            <p>Score: ${classA[0].score}/20</p>
        </div>`;
    }

    if (classB.length > 0) {
        winnerB.innerHTML = `
        <div class="leader-card">
            <h2>🥇 Winner - Class B</h2>
            <h3>${classB[0].roll} - ${classB[0].name}</h3>
            <p>Score: ${classB[0].score}/20</p>
        </div>`;
    }

}

loadWinners();