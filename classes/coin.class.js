class Coin extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];


    constructor(posX, posY, randomSpawn = false) { 
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        if (randomSpawn) { 
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