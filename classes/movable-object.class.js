/**
* Represents a movable object in the game.
* @extends DrawableObject
*/
class MovableObject extends DrawableObject {
    speed = 0.012;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    offsetY = 0;
    energy = 100;
    lastHit = 0;
    enemyIndexSave;


    /**
    * Checks if the character is colliding with enemy.
    * 
    * @param {any} obj - The object to check collision with.
    * @returns {boolean} - True if colliding, false otherwise.
    */
    isColliding(obj) {
        return (this.posX + 47 + this.width - 90) >= obj.posX &&
            this.posX + 47 <= (obj.posX + obj.width) &&
            (this.posY + 100 + this.offsetY + this.height - 112) >= obj.posY &&
            (this.posY + 100 + this.offsetY) <= (obj.posY + obj.height);
    }


    /**
    * Checks if the enemy is colliding with character or bottle.
    * 
    * @param {any} obj - The enemy object to check collision with.
    * @returns {boolean} - True if colliding with an enemy, false otherwise.
    */
    isCollidingEnemy(obj) { //ohne die character anpassungen nur außenkante der images....
        return (this.posX + this.width) >= obj.posX &&
            this.posX <= (obj.posX + obj.width) &&
            (this.posY + this.offsetY + this.height) >= obj.posY &&
            (this.posY + this.offsetY) <= (obj.posY + obj.height);
    }


    /**
     * Decreases the energy of the movable object when hit.
     * 
     */
    hit() {
        this.energy -= 7;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * Checks if the movable object is dead (energy is zero).
    * @returns {boolean} - True if dead, false otherwise.
    */
    isDead() {
        return this.energy == 0;
    }


    /**
    * Checks if the movable object is hurt (recently hit).
    * 
    * @returns {boolean} - True if hurt, false otherwise.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Moves the movable object to the right.
     * 
     */
    moveRight() {
        this.posX += this.speed;
    }


    /**
     * Moves the movable object to the left.
     * 
     */
    moveLeft() {
        this.posX -= this.speed;
    }


    /**
    * Plays the animation for the movable object using the provided images.
    * 
    * @param {string[]} image - The array of image paths for the animation.
    */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Applies gravity to the movable object, causing it to fall.
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
    * Checks if the movable object is above the ground.
    * 
    * @returns {boolean} - True if above the ground, false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.posY < 180;
        }
    }


    /**
     * Make the object jump.
     * 
     */
    jump() {
        this.speedY = 30;
    }
}