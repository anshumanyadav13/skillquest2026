import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    limit
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

const tbody = document.querySelector("#leaderboard tbody");

async function loadLeaderboard(){

    tbody.innerHTML = "";

    const q = query(
        collection(db,"scores"),
        orderBy("score","desc"),
        limit(10)
    );

    const snapshot = await getDocs(q);

    let rank = 1;

    snapshot.forEach((doc)=>{

        const data = doc.data();

        let medal = rank;

        if(rank==1) medal="🥇";
        else if(rank==2) medal="🥈";
        else if(rank==3) medal="🥉";

        tbody.innerHTML += `
        <tr>
            <td>${medal}</td>
            <td>${data.name}</td>
            <td>${data.score}</td>
        </tr>
        `;

        rank++;

    });

}

setInterval(loadLeaderboard, 3000);
loadLeaderboard();