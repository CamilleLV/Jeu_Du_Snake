// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6

const cnvMap = document.getElementById("snakeMap");

const defaultMap = {
    "dimensions": [80, 40],
    "delay": 200,
    "foodNumber": 2,
}

class SnakeMap {
    
    constructor(mapTempate) {
        // Taille de la map
        this.nbWSquare = mapTempate[dimensions][0];
        this.nbHSquare = mapTempate[dimensions][1];

        // Création de la grille de la map
        this.mapList = [];
        for (var i=0; i<this.nbHSquare; i++) {
            this.mapList.push(Array(this.nbWSquare));
        }

        // Gestion de la nouriture
        this.foodNumber = mapTempate[foodNumber];
        this.foodPlaces = [];
        for (var i=0; i<this.foodNumber; i++) {
            this.foodPlaces.push([
                Math.floor(Math.random() * this.nbWSquare), 
                Math.floor(Math.random() * this.nbHSquare)
            ]);
        }

    }

    getMapList() {
        return this.mapList;
    }

    getNbWSquare() {
        return this.nbWSquare;
    }

    getNbHSquare() {
        return this.nbHSquare;
    }

}

class Snake {

    constructor() {
        this.snakePosition = [];
        this.snakeVelocityW = 0;
        this.snakeVelocityH = 0;
    }

    getHeadPosition() {
        return this.snakePosition[0]
    }


}


function playGame() {

}


function main() {
    console.log("Ca marche");

    var test = new SnakeMap(5, 5, null);
    console.log(test.getMapList());
    test.mapConsolePrint();
}

main();