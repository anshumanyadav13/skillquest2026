if (localStorage.getItem("quizCompleted") === "true") {
    window.location.href = "result.html";
}

import { saveScore } from "./firebase.js";

history.pushState(null, null, location.href);

window.onbeforeunload = function () {
    return "If you leave or refresh this page, your quiz may be lost.";
};

window.onpopstate = function () {
    history.go(1);
};

questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const studentInfo = document.getElementById("studentInfo");
const logo = document.getElementById("logo");
const questionText = document.getElementById("questionText");
const questionNo = document.getElementById("questionNo");
const timerText = document.getElementById("timer");
const optionsDiv = document.getElementById("options");
const progressBar = document.getElementById("progressBar");

const studentName = localStorage.getItem("name");
const studentRoll = localStorage.getItem("roll");

studentInfo.innerHTML =
"👤 " + studentName + " | 🎓 Roll No: " + studentRoll;

// Preload all logos
questions.forEach(q => {
    if (q.logo) {
        const img = new Image();
        img.src = q.logo;
    }
});

function loadQuestion(){

    // Remove focus from previously clicked button
    if(document.activeElement){
        document.activeElement.blur();
    }

    clearInterval(timer);

    resetButtons();

    let q = questions[currentQuestion];

    questionNo.innerHTML =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

    progressBar.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";

    questionText.innerHTML = q.question;

    if(q.logo){
        logo.style.display = "block";
        logo.src = q.logo;
    }else{
        logo.style.display = "none";
    }

    let options = [...q.options];
    options.sort(() => Math.random() - 0.5);

    optionsDiv.innerHTML = "";



options.forEach(option => {

    const btn = document.createElement("button");

    btn.className = "option";
    btn.innerHTML = option;

    btn.onclick = function(){

        if(option === q.answer){
            score += q.points;
        }

        optionsDiv.querySelectorAll(".option").forEach(b => b.disabled = true);

        setTimeout(nextQuestion, 800);

    };

    optionsDiv.appendChild(btn);

});

    timeLeft = 15;
    timerText.innerHTML = "Time Left: 15s";

    timer = setInterval(function(){

        timeLeft--;

        timerText.innerHTML =
        "Time Left: " + timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(timer);

            disableButtons();

            setTimeout(nextQuestion,500);

        }

    },1000);

}

function disableButtons(){

    document.querySelectorAll(".option").forEach(btn=>{
        btn.disabled = true;
    });

}

function resetButtons(){
    // No code needed
}

async function nextQuestion(){

    clearInterval(timer);

    currentQuestion++;

    if(currentQuestion < questions.length){

        setTimeout(()=>{
            loadQuestion();
        },50);

    }else{

        localStorage.setItem("quizCompleted","true");

        await saveScore(score);

        document.body.innerHTML=`
        <div class="container">
            <div class="card">
                <h1>🎉 Quiz Submitted Successfully!</h1>
                <h2>Redirecting to Leaderboard...</h2>
            </div>
        </div>
        `;

        setTimeout(()=>{
            window.location.href="leaderboard.html";
        },2000);
    }
}

loadQuestion();