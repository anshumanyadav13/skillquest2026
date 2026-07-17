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

  docs.forEach(doc => {
    const d = doc.data();

    let board;
let rank;

if (d.classroom === "Room No.37") {
    board = room;
    rank = room.children.length + 1;
} else if (d.classroom === "Lab") {
    board = lab;
    rank = lab.children.length + 1;
} else {
    return;
}

let medal = rank;
if (rank == 1) medal = "🥇";
else if (rank == 2) medal = "🥈";
else if (rank == 3) medal = "🥉";

let percent = (d.score / 20) * 100;
let initial = d.name.charAt(0).toUpperCase();

board.innerHTML += `
<div class="leader-card">
    <div class="leader-top">
        <span class="medal">${medal}</span>

        <div class="avatar">
            ${initial}
        </div>

        <div class="info">
            <h3>${d.roll} - ${d.name}</h3>
            <small>⭐ ${d.score}/20 Points</small>
        </div>
    </div>

    <div class="bar">
        <div class="fill" style="width:${percent}%"></div>
    </div>
</div>
`;

    
  });
}

load();