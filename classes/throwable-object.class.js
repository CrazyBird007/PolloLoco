/**
* Represents a throwable object in the game.
* @extends MovableObject
*/
class ThrowableObject extends MovableObject {
    height = 60;
    width = 80;
    world;
    hasHitEnemy = false;
    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    /**
    * Creates a new instance of ThrowableObject.
    * 
    * @param {number} x - The x-coordinate of the throwable object.
    * @param {number} y - The y-coordinate of the throwable object.
    */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.posX = x;
        this.posY = y;
        this.throw();
    }


    /**
     * Throws the throwable object.
     * 
     */
    throw() {
        setInterval(() => {
            if (!this.hasHitEnemy) {
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 80);
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.posX += 12;
        }, 40);
    }
}