class MovableObject extends DrawableObject {
    speed = 0.012;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    offsetY = 0; 
    energy = 100;
    lastHit = 0;
    enemyIndexSave;


    // offsetY jetzt verstanden, das könnte man z.b. dem charakter geben um dessen äußere werte anzupassen oder dem coin etc.
    //neuer isColliding code ; diese positionen sind für die characterabgrenzung wichtig und können ggf. geändert werden, 
    //schau dazu in der drawframeborder function nach:       // this.posX + 47, this.posY + 100, this.width - 90, this.height - 112
    isColliding(obj) { //character anpassungen //offsetY gibts nun global und beim character jump ändert sie sich da
        return (this.posX + 47 + this.width - 90) >= obj.posX &&
            this.posX + 47 <= (obj.posX + obj.width) &&
            (this.posY + 100 + this.offsetY + this.height - 112) >= obj.posY &&
            (this.posY + 100 + this.offsetY) <= (obj.posY + obj.height);
        // &&  //das && obj.onCollisionCourse; erstmal rauslassen
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
    }                              // Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.


    // isColliding(obj) { //einfacherer alter colliding code, funktioniert auch
    //     return this.posX + 47 + this.width - 90 > obj.posX &&
    //     this.posY + 100 + this.height - 112 > obj.posY &&
    //     this.posX + 47 < obj.posX + obj.width &&  //im video fehlt das +obj.width
    //     this.posY + 100 < obj.posY + obj.height;
    //     //this.posX + 47, this.posY + 100, this.width - 90, this.height - 112 //(das ist der rote rahme vom character, diese werte müssen noch hinzugefügt bzw abgezogen werden)
    // }


    isCollidingEnemy(obj) { //ohne die character anpassungen nur außenkante der images....
        return (this.posX + this.width) >= obj.posX &&
            this.posX <= (obj.posX + obj.width) &&
            (this.posY + this.offsetY + this.height) >= obj.posY &&
            (this.posY + this.offsetY) <= (obj.posY + obj.height);
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() { 
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }


    moveRight() {
        this.posX += this.speed;
    }


    moveLeft() {
        this.posX -= this.speed;
    }


    playAnimation(image) {
        let i = this.currentImage % image.length; 
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25); 
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.posY < 180;
        }
    }


    jump() {
        this.speedY = 30;
    }
}