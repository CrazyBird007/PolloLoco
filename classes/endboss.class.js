class Endboss extends MovableObject {
    height = 400;
    width = 250;
    posY = 70;
    energy = 100;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    constructor(posX, posY, randomSpawn = false) { //kann feste oder zufällige positionen der x/y achse weitergeben aus level1.js
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();

        if (randomSpawn) { //wenn random spawn dann wird hier x /y ausgerechnet, wenn es koordinaten gibt dann werden diese genutzt
            this.posX = -300 + Math.random() * 2300;
            this.posY = posY;
            // this.posY = 70 + Math.random() * 330; 
        } else {
            this.posX = posX;
            this.posY = posY;
        }
    }


    animate() {
        // this.moveLeft(); //so könnte sich der endgegner bewegen
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 280);
    }
    

    hit() {
        this.energy -= 34;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }
}