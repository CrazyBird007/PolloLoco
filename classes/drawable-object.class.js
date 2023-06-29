class DrawableObject {
    posX = 0;
    posY = 0;
    height = 50;
    width = 50;
    img;
    imageCache = {};
    currentImage = 0;


    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); //lang: this.img = document.getElementbyId('image') gleich <img id="image" src="">
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
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height) // zeigt das bild an/bzw alle bilder
    }


    drawFrameBorder(ctx) {
        if (this instanceof EnemyChicken || this instanceof Endboss) { //basic  grenzen vom bild aus
            ctx.beginPath(); //begin bis stroke() macht die blauen kästen um die images
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character) { //richtige charakter grenzen die auch in der function isColliding() benutzt werden
            ctx.beginPath(); //begin bis stroke() macht die blauen kästen um die images
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + 47, this.posY + 100, this.width - 90, this.height - 112);
            ctx.stroke();
        }
    }
}