class SmallEnemyChicken extends EnemyChicken {
    height = 50;
    width = 50;
    posY = 410;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.posX = 300 + Math.random() * 1000;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.1 + Math.random() * 0.1;
    }
}