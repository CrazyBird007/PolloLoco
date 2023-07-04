class DrawableObject {
    posX = 0;
    posY = 0;
    height = 50;
    width = 50;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }


    drawFrameBorder(ctx) {
        if (this instanceof EnemyChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject || this instanceof SmallEnemyChicken) { //basic  grenzen vom bild aus
            ctx.beginPath(); 
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character) {  //char. grenzen die auch fürs colliding verwendet werfen
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + 47, this.posY + 100, this.width - 90, this.height - 112);
            ctx.stroke();
        }
    }
}