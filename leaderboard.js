alert("leaderboard.js loaded");

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

async function load() {
    const snap = await getDocs(collection(db, "scores"));

    const docs = snap.docs.sort((a, b) => b.data().score - a.data().score);

    const room = document.getElementById("leaderboard37");
    const lab = document.getElementById("leaderboardLab");

    room.innerHTML = "";
    lab.innerHTML = "";

    let roomRank = 1;
    let labRank = 1;

    docs.forEach(doc => {
        const d = doc.data();
console.log(d);
alert("Classroom = " + JSON.stringify(d.classroom));

        let board, rank;

        const classroom = String(d.classroom || "").trim().toLowerCase();

if (classroom.includes("room")) {
    board = room;
    rank = roomRank++;
} else if (classroom.includes("lab")) {
    board = lab;
    rank = labRank++;
} else {
    return;
}

        const medal = rank === 1 ? "🥇" :
                      rank === 2 ? "🥈" :
                      rank === 3 ? "🥉" : rank;

        board.innerHTML += `
        <div class="leader-card">
            <div class="leader-top">
                <span class="medal">${medal}</span>
                <div class="avatar">${d.name.charAt(0).toUpperCase()}</div>
                <div class="info">
                    <h3>${d.roll} - ${d.name}</h3>
                    <small>⭐ ${d.score}/20 Points</small>
                </div>
            </div>
        </div>`;
    });
}

load();