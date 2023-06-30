class Coin extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];


    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');

        this.posX = 300 + Math.random() * 1000; //lässt die gegner random auf der x achse spawnen
        this.loadImages(this.IMAGES_COIN);
        // this.animate();
    }
}