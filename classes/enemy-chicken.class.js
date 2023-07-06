class EnemyChicken extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    energy = 100;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];


    /**
     * Creates an instance of EnemyChicken.
     * 
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.posX = 300 + Math.random() * 10000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.12;
    }


    /**
     * Animates the enemy chicken by moving it to the left and playing the walking animation.
     * 
     */
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


    /**
     * Decreases the energy level of the enemy chicken when hit.
     * 
     */
    hit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }
}