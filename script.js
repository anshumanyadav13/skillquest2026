function startQuiz(){

    let name=document.getElementById("name").value;
    let roll=document.getElementById("roll").value;
    let cls=document.getElementById("class").value;

    if(name=="" || roll=="" || cls=="Select Class"){
        alert("Please fill all details.");
        return;
    }

    localStorage.setItem("name",name);
    localStorage.setItem("roll",roll);
    localStorage.setItem("class",cls);

    window.location.href="welcome.html";
}