var button = document.querySelector('#validate');
var scores = document.querySelector('#scores');
var timerHtml = document.querySelector('#timer');
var randMole; //case aléatoire pour la taupe
var nbSquare; //nb case
var mole; //taupe
var point = 0;
var timer = 3000; //imageTimer
var imageTimerInterval;
var clickStatus = true; //test pour un tour sans toucher la taupe(-1 point)
var gameStatus; //active eventListener dès que la partie ce lance
var timerStart ; //sert a r suppr
var globalTimer;
var globalTimerInterval;
timerHtml.innerHTML = "02:00"

button.addEventListener("click", function () { 
    point= 0;
    timerStart = new Date().getTime();

    clearInterval(imageTimerInterval);
    globalTimerInterval = setInterval(function (){
        globalTimer= new Date().getTime() - timerStart
        //console.log(globalTimer);
        timerHtml.innerHTML = globalTimer;
    },1000);


    var ligneColumn = document.getElementById('ligneColumn').value;
    var divGame = document.getElementById('divGame');
    nbSquare = ligneColumn*ligneColumn;
    divGame.innerHTML = "";
    for (let index = 1; index <= nbSquare; index++) {
        var square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.setAttribute('data-id', index);
        square.style.width = 100/ ligneColumn + '%';
        square.style.height = 100/ ligneColumn + '%';
        divGame.appendChild(square);
    }
    gameStatus = "start";
    updateTimer(); 
});

divGame.addEventListener("click", function (el) { 
    el = el.target;
    if (gameStatus != "start") {
        return;
    }
    if (el.dataset.id == randMole) {
        console.log('ouille');
        point++;
        if (timer > 900) {
            timer-= 300;
        }else if (900>=timer && timer >= 600) {
            timer-= 50;
        } else {
            timer-= 10;
        }
        console.log(timer);
    }else if (el.dataset.id != randMole) {
        point--;
        randMole =0;
        console.log('-1 points');   
        
    }
    clickStatus = true;
    updateTimer();
    if (mole) { 
        mole.style.backgroundImage = "none";
    }
});

function displayMole() {
    if (mole) {
        mole.style.backgroundImage = "none";
    }
    if (!clickStatus) {
        timer = 3000;
        console.log(timer);
        console.log('fuite de la taupe ! -1 points');  
        point--;
        updateTimer();
    }
    clickStatus = false;
    randMole = Math.floor(Math.random() * nbSquare) + 1;
    mole = document.querySelector('[data-id="'+randMole+'"]');
    mole.style.backgroundImage = "url('./public/image/taTaupe.png')";
    mole.style.backgroundSize = "100% 100%";
};
function updateTimer() {
    scoresColor();
    clearInterval(imageTimerInterval);
    imageTimerInterval = setInterval(displayMole, timer);
}
function scoresColor() {
    scores.innerHTML = point;
    if (point>0) {
        scores.style.color = "green";
    }else if (point<0){
        scores.style.color = "red";
    }else{
        scores.style.color = "black";
    };
}