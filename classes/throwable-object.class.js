class ThrowableObject extends MovableObject {
    height = 60;
    width = 80;
    world;
    hasHitEnemy = false;

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.posX = x;
        this.posY = y;
        this.throw();
    }


    throw() {  //schneller bottle werfen kann man wenn man in der function run oder collision setintervall verringert zurzeit nur alle 250ms junus hat 200 glaube ich
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.posX += 12;
        }, 40);
    }
}