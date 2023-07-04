/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The X position of the background object.
     * @type {number}
     */
    posX = 0;

    /**
     * The Y position of the background object.
     * @type {number}
     */
    posY = 0;

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Constructs a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image representing the background object.
     * @param {number} posX - The X position of the background object.
     * @param {number} posY - The Y position of the background object.
     */
    constructor(imagePath, posX, posY) {
        super().loadImage(imagePath);
        this.posX = posX;
        this.posY = posY;
    }
}