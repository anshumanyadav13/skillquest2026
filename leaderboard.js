alert("leaderboard.js loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


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

  const room = document.getElementById("leaderboard37");
  const lab = document.getElementById("leaderboardLab");

  room.innerHTML = "";
  lab.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();

    const html = `<p style="color:white">${d.roll} - ${d.name} (${d.score})</p>`;

    if (d.classroom === "Room No.37") {
      room.innerHTML += html;
    } else if (d.classroom === "Lab") {
      lab.innerHTML += html;
    }
  });
}

load();