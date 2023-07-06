class Coin extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];


    /**
    * Creates an instance of Coin.
    * 
    * @param {number} posX - The initial horizontal position of the coin.
    * @param {number} posY - The initial vertical position of the coin.
    * @param {boolean} [randomSpawn=false] - Indicates if the coin should be spawned at a random position.
    */
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


    /**
     * Animates the coin by playing the animation.
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 600);
    }
}