class Endboss extends MovableObject {
    height = 400;
    width = 250;
    posY = 70;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    constructor(posX, posY, randomSpawn = false) { //kann feste oder zufällige positionen der x/y achse weitergeben aus level1.js
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
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
            this.playAnimation(this.IMAGES_WALKING);
        }, 280);
    }
}


// class Endboss extends MovableObject {
//     height = 400;
//     width = 250;
//     posY = 70;
//     IMAGES_WALKING = [
//         'img/4_enemie_boss_chicken/2_alert/G5.png',
//         'img/4_enemie_boss_chicken/2_alert/G6.png',
//         'img/4_enemie_boss_chicken/2_alert/G7.png',
//         'img/4_enemie_boss_chicken/2_alert/G8.png',
//         'img/4_enemie_boss_chicken/2_alert/G9.png',
//         'img/4_enemie_boss_chicken/2_alert/G10.png',
//         'img/4_enemie_boss_chicken/2_alert/G11.png',
//         'img/4_enemie_boss_chicken/2_alert/G12.png',
//     ];


//     constructor() {
//         super().loadImage(this.IMAGES_WALKING[0]);
//         this.loadImages(this.IMAGES_WALKING);
//         this.posX = 2270;
//         this.animate();
//     }
    

//     animate() {
//         // this.moveLeft(); //so könnte sich der endgegner bewegen
//         setInterval(() => { 
//             this.playAnimation(this.IMAGES_WALKING);
//         }, 280);
//     }
// }