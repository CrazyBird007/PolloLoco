class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2301;


    constructor(enemies, clouds, backgroundObjects) { //aus dem levels ordner wird hier z.b. level1.js 3 funktionsparameter 
        this.enemies = enemies;  //weitergegeben im constructor und diese werden dann ind er class level  zu einem object
        this.clouds = clouds;   //erstellt indem sie hier übergeben werden mit this.enemies= enemies z.b.
        this.backgroundObjects = backgroundObjects;
    }
}