class MovableObject extends DrawableObject {
    speed = 0.012;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    offsetY = 0; //man könnte dem character beim springen offsetY geben
    energy = 100;
    lastHit = 0;


//neuer isColliding code ; diese positionen sind für die characterabgrenzung wichtig und können ggf. geändert werden, 
//schau dazu in der drawframeborder function nach:       // this.posX + 47, this.posY + 100, this.width - 90, this.height - 112
    isColliding(obj) { //hier gibt es noch eine offsetY, wieso?! für die höhe? gibts nun global und beim character jump ändert sie sich da
        return (this.posX + 47 + this.width - 90) >= obj.posX && this.posX <= (obj.posX + obj.width) &&
            (this.posY + 100 + this.offsetY + this.height-112) >= obj.posY &&
            (this.posY + 100 + this.offsetY) <= (obj.posY + obj.height) ;
            // &&  //das && obj.onCollisionCourse; erstmal rauslassen
            // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
    }                              // Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    
    // isColliding(obj) { //einfacherer alter colliding code, funktioniert auch
    //     return this.posX + this.width > obj.posX &&
    //     this.posY + this.height > obj.posY &&
    //     this.posX < obj.posX &&
    //     this.posY < obj.posY + obj.height;
    // }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() { //hier wird true returnt also tot, wenn energy == 0 ist, sonst false also nicht tot
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //new date = neue zeit jetzt in millisec. MINUS lastHit (gespeicherte zeit vorher) / difference in millisec.
        timepassed = timepassed / 1000; //differenz in secunden
        return timepassed < 1; //heißt das man innerhalb der letzten 5 sec. getroffen wurde, dann wird true returnt wenn es stimmt sonst false
    }


    moveRight() {
        this.posX += this.speed;
    }


    moveLeft() {
        this.posX -= this.speed;
    }


    playAnimation(image) {
        let i = this.currentImage % image.length; //so siehts beim ersten mal aus i = 0 % 6 //  0/6 = 0, rest 0
        // wenn i = 1  dann 1/ 6 = 0 rest 1 bei i = 5 dann 5/6 = 0 rest 5 und bei i = 6 ist  6 / 6 = 1 , rest 0
        // im nächsten schritt hat / hätte i den wert 7  dann wird 7 / 6 geteilt und es ergibt 1, rest 1 , modulu hebt nur den rest
        // auf also hat i nun wieder den wert 1 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0,... es wird also immer zurückgesetzt wegen dem % modulo
        let path = image[i]; // currentImage ist standart 0 definiert
        this.img = this.imageCache[path];
        this.currentImage++; //currentImage kriegt hier den wert +1
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25); //25 mal ausführen in 1 sec.
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { //wenn es ein trowableobject ist dann returnt es true  und fällt immer weiter
            return true;
        } else {
            return this.posY < 180; //wenn posY kleiner als 180 ist bedeutet das das sich das objekt in der luft befindet
        }
    }

    jump() {
        this.speedY = 30;
    }
}