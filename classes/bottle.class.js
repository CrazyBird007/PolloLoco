class Bottle extends DrawableObject {
    height = 60;
    width = 60;
    posY = 365;
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];


    constructor(posX, posY, randomSpawn = false) { //kann feste oder zufällige positionen der x/y achse weitergeben aus level1.js
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.chooseRandomImage();

        if (randomSpawn) { //wenn random spawn dann wird hier x /y ausgerechnet, wenn es koordinaten gibt dann werden diese genutzt
            this.posX = 100 + Math.random() * 2200; 
            this.posY = 390; //so stehen die flaschen immer auf dem boden
        } else {
            this.posX = posX; 
            this.posY = posY; 
        }
    }


    chooseRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        let randomImage = this.IMAGES_BOTTLE[randomIndex];
        this.loadImage(randomImage);
      }
}