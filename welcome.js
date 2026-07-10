let name = localStorage.getItem("name");

document.getElementById("welcomeName").innerHTML = "Welcome, " + name + "!";

let count = 3;

let timer = setInterval(function(){

    document.getElementById("countdown").innerHTML = count;

    count--;

    if(count < 0){
        clearInterval(timer);
        window.location.href = "quiz.html";
    }

},1000);