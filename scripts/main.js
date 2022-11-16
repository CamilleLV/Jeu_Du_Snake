// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6

const cnvMap = document.getElementById("snakeMap");

const defaultMap = {
    "dimensions": [80, 40],
    "delay": 200,
    "foodNumber": 2,
    "snake": [
        [60,60],
        [60,59],
        [60,58],
    ]
}

var toucheEnfonce = null;


document.onkeydown = keyMooves;

function keyMooves(e) {
    e = e || window.event;

    if (e.key === 'ArrowUp') { // Si flèche du Haut
        toucheEnfonce = 0;
    } else if (e.key === 'ArrowDown') { // Si flèche du bas
        toucheEnfonce = 1;
    } else if (e.key === 'ArrowLeft') { // Si flèche à gauche 
        toucheEnfonce = 2;
    } else if (e.key === 'ArrowRight') { // Si flèche à droite 
        toucheEnfonce = 3;
    }
}


function draw(map) {

}


function step() {

}


function playGame(mapTemplate) {
    // Définition des dimensions de la map
    var nbWSquare = mapTemplate["dimensions"][0];
    var nbHSquare = mapTemplate["dimensions"][1];

    // Dé
    var mapList = [];
    for (var i=0; i<nbHSquare; i++) {
        mapList.push(Array(nbWSquare));
    }

    var foodNumber = mapTemplate["foodNumber"][1];

    snake = mapTemplate["snake"];
    snakeVelocityW = 0;
    snakeVelocityH = 0;



}


function main() {
    console.log("Ca marche");

    playGame(defaultMap);
}

main();