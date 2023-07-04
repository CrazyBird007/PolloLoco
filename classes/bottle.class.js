class Bottle extends DrawableObject {
    height = 60;
    width = 60;
    posY = 365;
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];


    constructor(posX, posY, randomSpawn = false) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.chooseRandomImage();
        if (randomSpawn) {
            this.posX = 100 + Math.random() * 2200;
            this.posY = 390;
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