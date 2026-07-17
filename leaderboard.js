import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    where,
    orderBy,
    onSnapshot
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

function loadLeaderboard(classroom, elementId) {

    const board = document.getElementById(elementId);

    const q = query(
    collection(db, "scores"),
    orderBy("score", "desc")
);

    onSnapshot(q, (snapshot) => {

        board.innerHTML = "";

const filtered = snapshot.docs.filter(doc =>
    doc.data().classroom === classroom
);
        if (filtered.length === 0) {
            board.innerHTML = "<p style='color:white;text-align:center;'>No participants yet.</p>";
            return;
        }

        let rank = 1;

        filtered.forEach((doc) => {

            const data = doc.data();

            let medal = rank;
            if (rank == 1) medal = "🥇";
            else if (rank == 2) medal = "🥈";
            else if (rank == 3) medal = "🥉";

            let initial = data.name.charAt(0).toUpperCase();
            let percent = (data.score / 20) * 100;

            board.innerHTML += `
            <div class="leader-card">
                <div class="leader-top">

                    <span class="medal">${medal}</span>

                    <div class="avatar avatar${rank}">
                        ${initial}
                    </div>

                    <div class="info">
                        <h3>${data.roll} - ${data.name}</h3>
                        <small>⭐ ${data.score}/20 Points</small>
                    </div>

                </div>

                <div class="bar">
                    <div class="fill" style="width:${percent}%"></div>
                </div>
            </div>
            `;

            rank++; 
        });

    });

}

loadLeaderboard("Room No.37", "leaderboard37");
loadLeaderboard("Lab", "leaderboardLab");