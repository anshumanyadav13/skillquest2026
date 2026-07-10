let name = localStorage.getItem("name");
let score = localStorage.getItem("score");
let total = localStorage.getItem("total");

document.getElementById("studentName").innerHTML = "Congratulations, " + name + "!";

document.getElementById("score").innerHTML = score + " / " + total;

let percent = Math.round((score / total) * 100);

document.getElementById("percentage").innerHTML = percent + "%";

if(percent >= 80){
    document.getElementById("message").innerHTML = "🏆 Excellent!";
}
else if(percent >= 60){
    document.getElementById("message").innerHTML = "👏 Good Job!";
}
else{
    document.getElementById("message").innerHTML = "😊 Keep Practicing!";
}

function restartQuiz(){
    window.location.href = "index.html";
}