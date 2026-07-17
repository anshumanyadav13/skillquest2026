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

        let board, rank;

        const classroom = String(d.classroom || "")
    .toLowerCase()
    .replace(/\s+/g, "")   // remove all spaces
    .replace(/\./g, "");   // remove dots

if (classroom === "roomno37") {
    board = room;
    rank = roomRank++;
} else if (classroom === "lab") {
    board = lab;
    rank = labRank++;
} else {
    return;
}

        const medal = rank === 1 ? "🥇" :
                      rank === 2 ? "🥈" :
                      rank === 3 ? "🥉" : rank;

        board.innerHTML += `
<p style="color:white;font-size:20px">
${medal} ${d.roll} - ${d.name} (${d.score})
</p>`;
    });
}

load();