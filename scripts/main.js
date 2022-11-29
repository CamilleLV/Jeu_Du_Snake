// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6

/* ################# CONSTANTES GLOBALES ################# */
const cnvMap = document.getElementById("snakeMap");
const ctxMap = cnvMap.getContext("2d");
const defaultMap = {
    "dimensions": [30, 15],
    "delay": 200,
    "foodNumber": 5,
    "snake": [
        [15,5],
        [15,6],
        [15,7],
    ]
}
const foodLenghAdd = 3;
const divParentCnv = document.getElementById("mapSection");
const spanScore = document.getElementById("score");
const spanHighScore = document.getElementById("highScore");



/* ################# VARIABLES GLOBALES ################# */
var snakeDirection = null;
var score = 0;
var snake = [];
var mapList = [];
var gameOver = false;
var stepTime = 300;
var foodNumber = 1;

var imgHeadSnake = document.getElementById("snakeHead");
var imgFood = document.getElementById("apple");



/* ################# FONCTIONS ################# */
function keyMooves(e) {
    e = e || window.event;

    if (e.key === 'ArrowUp') { // Si flèche du Haut
        snakeDirection = "UP";
        console.log("UP");
    } else if (e.key === 'ArrowDown') { // Si flèche du bas
        snakeDirection = "DOWN";
        console.log("DOWN");
    } else if (e.key === 'ArrowLeft') { // Si flèche à gauche 
        snakeDirection = "LEFT";
        console.log("LEFT");
    } else if (e.key === 'ArrowRight') { // Si flèche à droite 
        snakeDirection = "RIGHT";
        console.log("RIGHT");
    }
}

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
    console.log("Début de la fonction draw");
    
    // Nombre de lignes et de colonnes
    var nbLigne = mapList.length;
    var nbColonne = mapList[0].length;

    // Calcul de la taille des pixels 
    var widthDiv = divParentCnv.clientWidth - 50;
    var heightDiv = divParentCnv.clientHeight - 50;

    if (Math.floor(widthDiv/nbColonne) >= Math.floor(heightDiv/nbLigne)) {
        var squareWidth = Math.floor(heightDiv/nbLigne);
    } else {
        var squareWidth = Math.floor(widthDiv/nbColonne);
    }

    // Définition des informations du canva.
    cnvMap.style.width = nbColonne * squareWidth + "px";
    cnvMap.style.height = nbLigne * squareWidth + "px";
    cnvMap.width = nbColonne * squareWidth;
    cnvMap.height = nbLigne * squareWidth;

    ctxMap.fillStyle = 'grey';
    ctxMap.fillRect(0, 0, nbColonne * squareWidth, nbLigne * squareWidth);

    for (var i=0; i<nbLigne; i++) {
        for (var j=0; j<nbColonne; j++) {

            if (mapList[i][j] == 'SNAKE') {
                ctxMap.fillStyle = 'pink';
                ctxMap.fillRect(j*squareWidth, i*squareWidth, squareWidth, squareWidth);
            }
            if (mapList[i][j] == 'HEAD') {
                ctxMap.fillStyle = 'purple';
                ctxMap.fillRect(j*squareWidth, i*squareWidth, squareWidth, squareWidth);

                ctxMap.drawImage(imgHeadSnake, j*squareWidth, i*squareWidth, squareWidth, squareWidth);
            }
            if (mapList[i][j] == 'FOOD') {
                console.log(i, j, "FOOD");
                ctxMap.fillStyle = 'red';
                //ctxMap.fillRect(j*squareWidth, i*squareWidth, squareWidth, squareWidth);
                
                ctxMap.drawImage(imgFood, j*squareWidth, i*squareWidth, squareWidth, squareWidth);

            }
        }
    }

    console.log("Fin de la fonction draw");
}

function updateScore() {
    spanScore.textContent = score;
    try {
        var highScore = window.localStorage.getItem('highScore');
        spanHighScore.textContent = highScore;
    } catch (e) {
        var highScore = 0;
        window.localStorage.setItem('highScore', 0);
    }
    if (score > highScore) {
        spanHighScore.textContent = score;
        window.localStorage.setItem('highScore', score);
    }
    
}

function generateFood() {
    if (mapList.length*mapList[0].length > snake.length+foodNumber) {
        var posFoodX = randint(0, mapList[0].length-1);
        var posFoodY = randint(0, mapList.length-1);

        while (mapList[posFoodY][posFoodX]){
            posFoodX = randint(0, mapList[0].length-1);
            posFoodY = randint(0, mapList.length-1);
        }

        mapList[posFoodY][posFoodX] = "FOOD";
    }
}

function step() {
    console.log("Début d'un step");

    // Si l'utilisateur à choisi une direction
    if (snakeDirection) {
        var newHeadPosition = [];
        var oldHeadPosition = snake[0];
        
        // On determine la nouvelle position de la tête du snake.
        if (snakeDirection == "UP") {
            newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1]-1];
        } else if (snakeDirection == "DOWN") {
            newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1]+1];
        } else if (snakeDirection == "LEFT") {
            newHeadPosition = [oldHeadPosition[0]-1, oldHeadPosition[1]];
        } else if (snakeDirection == "RIGHT") {
            newHeadPosition = [oldHeadPosition[0]+1, oldHeadPosition[1]];
        }

        // on transforme l'ancienne position de la tête en corp
        mapList[oldHeadPosition[1]][oldHeadPosition[0]] = "SNAKE";


        // Verification que la position de la tête est valide
        if (newHeadPosition[0] < 0 || newHeadPosition[0] >= mapList[0].length ||    // S'il est en dehors de la map d'un point de vu vertical
            newHeadPosition[1] < 0 || newHeadPosition[1] >= mapList.length ||       // S'il est en dehors de la map d'un point de vu horizontal
            mapList[newHeadPosition[1]][newHeadPosition[0]] == "SNAKE" ||           // S'il se mort la queu
            mapList[newHeadPosition[1]][newHeadPosition[0]] == "WALL" ) {           // S'il se prends un mure
            
            // Alors la partie est finie
            gameOver = true;
        // Sinon si le snake a mangé de la nourriture
        } else if (mapList[newHeadPosition[1]][newHeadPosition[0]] == "FOOD") {
            // Ajout du score
            score += 1;
            updateScore();

            // Ajout de la taille du snake
            for (var i=0; i<foodLenghAdd-1; i++) {
                snake.push(snake[snake.length-1]);
            }

            // On génère une nouvelle nourriture
            generateFood()

            // On place la position de la tête
            snake.unshift(newHeadPosition);
            mapList[newHeadPosition[1]][newHeadPosition[0]] = "HEAD";
        // Sinon le snake n'a pas mangé de nourriture
        } else {
            // On suprimer le dernier élément de la liste
            var deletedPosition = snake.pop();

            // Si il n'est pas présent plusieurs fois dans le snake (cas particulier après avoir mangé)
            if (!snake.includes(deletedPosition)) {
                // On suprimer le snake de la case sur la map
                mapList[deletedPosition[1]][deletedPosition[0]] = null;
            }
            
            // On place la position de la tête
            snake.unshift(newHeadPosition);
            mapList[newHeadPosition[1]][newHeadPosition[0]] = "HEAD";
        }
    }

    draw();
    if (!gameOver) setTimeout(step, stepTime);
    console.log(snake);

    console.log("Fin d'un step");
}

function playGame(mapTemplate) {
    console.log("Début de l'initialisation de la partie.");

    // Initialisation map (dimensions et remplissage)
    var nbWSquare = mapTemplate["dimensions"][0];
    var nbHSquare = mapTemplate["dimensions"][1];
    mapList = [];
    for (var i=0; i<nbHSquare; i++) {
        mapList.push(Array(nbWSquare));
    }

    // Définition du snake et affichage initiale
    snake = mapTemplate["snake"];
    snakeDirection = null;
    snake.forEach(position => {
        mapList[position[1]][position[0]] = 'SNAKE';
    });
    mapList[snake[0][1]][snake[0][0]] = 'HEAD';

    // Définition du nombre de nouriture et affichage initiale
    foodNumber = mapTemplate["foodNumber"];
    for (var i=0; i<foodNumber; i++) {
        generateFood();
    }
    
    // Initialisation de la partie
    score = 0;
    updateScore();
    gameOver = false;

    console.log("Fin de l'initialisation de la partie.");

    // Premier pas
    step();
}

function showMenu() {

}

function maskMenu() {
    
}



/* ################# PROGRAMME PRINCIPAL ################# */
document.onkeydown = keyMooves;
main();

function main() {
    playGame(defaultMap);
}