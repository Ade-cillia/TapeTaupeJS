var button = document.querySelector('#validate');
var randMole;
var nbSquare;
var mole;
var point;
var timer;

button.addEventListener("click", function () { 
    var ligneColumn = document.getElementById('ligneColumn').value;
    var divGame = document.getElementById('divGame');
    nbSquare = ligneColumn*ligneColumn;
    console.log('click');
    console.log('click');
    divGame.innerHTML = "";
    
      
    for (let index = 1; index <= nbSquare; index++) {
        var square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.setAttribute('data-id', index);
        square.style.width = 100/ ligneColumn + '%';
        square.style.height = 100/ ligneColumn + '%';
        divGame.appendChild(square);
    }
    ;
    time = setTimeout(displayMole(nbSquare), 3000);
});

function displayMole(nbSquare) {
    console.log('izza');
    timer = 300;
    
    randMole = Math.floor(Math.random() * nbSquare) + 1;
    console.log(randMole);
    mole = document.querySelector('[data-id="'+randMole+'"]');
    
    mole.style.backgroundImage = "url('./public/image/taTaupe.png')";
    mole.style.backgroundSize = "100% 100%";
};

divGame.addEventListener("click", function (el) { 
    el = el.target;
    if (el.dataset.id == randMole) {
        console.log('ouille');
        point++;
        mole.style.backgroundImage = "none";
        displayMole(nbSquare);
    }else{
        point--;
        console.log('-1 points');
    }
});