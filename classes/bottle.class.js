/**
 * Represents a bottle object in the game.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 60;

    /**
     * The Y position of the bottle.
     * @type {number}
     */
    posY = 365;

    /**
     * The array of image paths for the bottle.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructs a new Bottle instance.
     * @param {number} posX - The X position of the bottle.
     * @param {number} posY - The Y position of the bottle.
     * @param {boolean} [randomSpawn=false] - Determines if the bottle should spawn at a random position.
     */
    constructor(posX, posY, randomSpawn = false) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.chooseRandomImage();
        if (randomSpawn) {
            this.posX = 100 + Math.random() * 2200;
            this.posY = 390;
        } else {
            this.posX = posX;
            this.posY = posY;
        }
    }

    /**
     * Chooses a random image from the IMAGES_BOTTLE array and loads it.
     */
    chooseRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        let randomImage = this.IMAGES_BOTTLE[randomIndex];
        this.loadImage(randomImage);
    }
}