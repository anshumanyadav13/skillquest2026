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
const optionButtons = document.querySelectorAll(".option");
const progressBar = document.getElementById("progressBar");

let studentName = localStorage.getItem("name");
let studentRoll = localStorage.getItem("roll");

studentInfo.innerHTML =
"👤 " + studentName + " | 🎓 Roll No: " + studentRoll;

function loadQuestion(){

    clearInterval(timer);

    let q = questions[currentQuestion];

    liveScore.innerHTML = "⭐ Score: " + score;

    questionNo.innerHTML =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

    let progress =
    ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    questionText.innerHTML = q.question;

if(q.logo && q.logo !== ""){
    logo.style.display = "block";
    logo.src = q.logo;
}else{
    logo.style.display = "none";
}

    let options = [...q.options];
    options.sort(() => Math.random() - 0.5);

    for(let i=0;i<4;i++){

        optionButtons[i].innerHTML = options[i];

        optionButtons[i].onclick = function(){

            if(this.innerHTML == q.answer){

    score += q.points;

}

            disableButtons();

            setTimeout(function(){

                nextQuestion();

            },800);

        };

    }

    resetButtons();

    timeLeft = 15;

    timerText.innerHTML = "Time Left: 15s";

    timer = setInterval(function(){

        timeLeft--;

        timerText.innerHTML =
        "Time Left: " + timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(timer);

            disableButtons();

            setTimeout(function(){

                nextQuestion();

            },500);

        }

    },1000);

}

function disableButtons(){

    optionButtons.forEach(btn=>btn.disabled=true);

}

function resetButtons(){

    optionButtons.forEach(btn=>{

        btn.disabled=false;

    });

}

async function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }else{

        localStorage.setItem("score", score);
localStorage.setItem("total", 40);
localStorage.setItem("quizCompleted","true");

await saveScore(score);

        document.body.innerHTML=`
        <div class="container">
            <div class="card">
                <h1>🎉 Quiz Completed!</h1>
                <h2>Calculating your score...</h2>
            </div>
        </div>
        `;

        setTimeout(function(){

            window.location.href="result.html";

        },2000);

    }

}

loadQuestion();