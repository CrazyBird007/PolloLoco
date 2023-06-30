class Coin extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];


    constructor(posX, posY, randomSpawn = false) { //kann feste oder zufällige positionen der x/y achse weitergeben aus level1.js
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();

        if (randomSpawn) { //wenn random spawn dann wird hier x /y ausgerechnet, wenn es koordinaten gibt dann werden diese genutzt
            this.posX = -500 + Math.random() * 2750; 
            this.posY = 70 + Math.random() * 330; 
        } else {
            this.posX = posX; 
            this.posY = posY; 
        }
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 600);
    }
}