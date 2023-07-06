/**
 * Represents a drawable object.
 * 
 */
class DrawableObject {
    posX = 0;
    posY = 0;
    height = 50;
    width = 50;
    img;
    imageCache = {};
    currentImage = 0;


    /**
    * Loads an image from the specified path.
    * 
    * @param {string} path - The path of the image to load.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads multiple images from the specified array of paths.
     * 
     * @param {string[]} array - The array of image paths to load.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
    * Draws the object on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }


    /**
    * Draws a frame border around the object on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    drawFrameBorder(ctx) {
        if (this instanceof EnemyChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject || this instanceof SmallEnemyChicken) { //basic picture borders
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character) {  //char. border for colliding
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + 47, this.posY + 100, this.width - 90, this.height - 112);
            ctx.stroke();
        }
    }
}