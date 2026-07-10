questions.sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const logo = document.getElementById("logo");
const questionNo = document.getElementById("questionNo");
const timerText = document.getElementById("timer");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {

    clearInterval(timer);

    let q = questions[currentQuestion];

let options = [...q.options];
options.sort(() => Math.random() - 0.5);

    questionNo.innerHTML = "Question " + (currentQuestion + 1) + " of " + questions.length;
  let progress = ((currentQuestion + 1) / questions.length) * 100;
progressBar.style.width = progress + "%";

    logo.src = q.logo;

    for(let i=0; i<4; i++){
        optionButtons[i].innerHTML = options[i];

        optionButtons[i].onclick = function(){

            if(this.innerHTML == q.answer){
                score++;
                this.style.background = "green";
            }
            else{
                this.style.background = "red";
            }

            disableButtons();
        };
    }

    timeLeft = 15;
    timerText.innerHTML = "Time Left: 15s";

    timer = setInterval(function(){

        timeLeft--;

        timerText.innerHTML = "Time Left: " + timeLeft + "s";

        if(timeLeft == 0){
            clearInterval(timer);
            disableButtons();
        }

    },1000);

    resetButtons();
}

function disableButtons(){
    optionButtons.forEach(btn => btn.disabled = true);
}

function resetButtons(){
    optionButtons.forEach(btn=>{
        btn.disabled = false;
        btn.style.background = "#4f46e5";
    });
}

nextBtn.onclick = function(){

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }
    else{
        localStorage.setItem("score", score);
localStorage.setItem("total", questions.length);

window.location.href = "result.html";
    }

};

loadQuestion();