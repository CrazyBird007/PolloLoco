class SmallEnemyChicken extends MovableObject {
    height = 50;
    width = 50;
    posY = 410;
    energy = 100;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.posX = 300 + Math.random() * 3500;
        this.animate();
        this.speed = 0.1 + Math.random() * 0.1;
    }


    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 144);
        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 280);
    }


    hit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }
}