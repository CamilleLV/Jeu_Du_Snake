function main() {


    /*var mapInfo = map1.json;

    var dimLargeur = mapInfo.dimensions[0];
    var dimHauteur = mapInfo.dimensions[1];
    var delay = mapInfo.delay;
    var posApple = mapInfo.food;*/

    document.onkeydown = keyMooves;


    function keyMooves(e) {

        e = e || window.event;

        if (e.key === 'ArrowUp') { // Si flèche du Haut
            console.log("flèche du Haut");
            var keyInfo = 0;
            console.log(keyInfo);
        }
        else if (e.key === 'ArrowDown') { // Si flèche du bas
            console.log("flèche du Bas");
            var keyInfo = 1;
            console.log(keyInfo);
        }
        else if (e.key === 'ArrowLeft') { // Si flèche à gauche 
            console.log("flèche de Gauche");
            var keyInfo = 2;
            console.log(keyInfo);
        }
        else if (e.key === 'ArrowRight') { // Si flèche à droite 
            console.log("flèche de Droite");
            var keyInfo = 3;
            console.log(keyInfo);
        }
        return keyInfo;
    }

    function step() {

        var directionSnake = keyMooves;

    }

    setInterval(step, 500); /*Le second paramètre devra être delay*/
}

main();