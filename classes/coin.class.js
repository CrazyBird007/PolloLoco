class Coin extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];


    // constructor(posX, posY, randomSpawn = false) {
    //     super().loadImage('./img/8_coin/coin_1.png');
    //     this.posX = posX;
    //     this.posY = posY;
    //     // this.posX = 300 + Math.random() * 1000; //lässt die coins random auf der xachse spawnen
    //     this.loadImages(this.IMAGES_COIN);
    //     this.animate();
    // }

    constructor(posX, posY, randomSpawn = false) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();

        if (randomSpawn) {
            this.posX = -600 + Math.random() * 2900; // Zufällige Position auf der X-Achse
            this.posY = 70 + Math.random() * 330; // Zufällige Position auf der Y-Achse
        } else {
            this.posX = posX; // Feste Position auf der X-Achse
            this.posY = posY; // Feste Position auf der Y-Achse
        }
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 600);
    }
}