class Character extends MovableObject {
    height = 270;
    width = 150;
    posY = 0;
    speed = 8;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    world; // hier werden alle variablen aus der world class gespeichert //  durch die setWorld() func. aus der world class


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.isDead();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.posX < this.world.level.level_end_x) { // char kann nicht weiter als level_endX nach rechts gehen
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.posX > -567) { // durch das && posX kann der charakter nciht weiter als > X nach links laufen
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) { //er springt wenn man key UP drückt, nur wenn er am boden ist
                this.jump();
            }

            this.world.camera_x = -this.posX + 150; // wenn x vom char. verändert wird, wird die camera_x variable verändert, so bewegt sich das bild
        }, 1000 / 60);   // durch das + wird der charakter im bild verschoben, so könnte er mittig sein oder leicht links
        setInterval(() => {    
            if (this.isDead() ) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {  // die charakter animation wird nur abgespielt wenn man die taste nach rechts drückt
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    jump() {
        this.speedY = 30;
        this.offsetY = this.speedY;
    }
}