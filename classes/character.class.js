/**
 * Represents a movable character object.
 * @extends MovableObject
 */
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
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    longIdleSound = false;


    /**
    * Creates the images, gravity of Character and animates him and check if character is dead.
    * 
    */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.isDead();
    }


    /**
     * starts the animation loop for the character
     * 
     */
    animate() {
        setInterval(() => {
            this.moveCharacter();
            this.moveCamera();
        }, 1000 / 60);
        setInterval(() => {
            this.handleCharacterMoves();
        }, 102);
    }


    /**
     * This is a help function to smaller the code
     * 
     */
    handleCharacterMoves() {
        if (this.isDead()) {
            this.handleCharacterDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.lastActiveTime = new Date();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.lastActiveTime = new Date();
        } else {
            this.handleIdleAnimation();
        }
    }

    /**
    * Moves the character based on keyboard input.
    */
    moveCharacter() {
        this.world.characterWalkSound.pause();
        this.processMoveRight();
        this.processMoveLeft();
        this.processJump();
    }


    /**
     * This is a help function to smaller the code
     * 
     */
    processMoveRight() {
        if (this.world.keyboard.RIGHT && this.posX < this.world.level.level_end_x && !this.isDead() && !this.world.endbossDead) {
            this.moveRight();
            this.otherDirection = false;
            this.longIdleSound = false;
            if (this.world.isSoundEnabled) {
                this.world.characterWalkSound.play();
            } else {
                this.world.characterWalkSound.pause();
            }
        }
    }


    /**
     * This is a help function to smaller the code
     * 
     */
    processMoveLeft() {
        if (this.world.keyboard.LEFT && this.posX > -567 && !this.isDead() && !this.world.endbossDead) {
            this.moveLeft();
            this.otherDirection = true;
            this.longIdleSound = false;
            if (this.world.isSoundEnabled) {
                this.world.characterWalkSound.play();
            } else {
                this.world.characterWalkSound.pause();
            }
        }
    }


    /**
     * This is a help function to smaller the code
     * 
     */
    processJump() {
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isDead() && !this.world.endbossDead) {
            this.jump();
            this.longIdleSound = false;
            if (this.world.isSoundEnabled) {
                this.world.characterJumpSound.play();
            }
        }
    }


    /**
     * Moves the camera based on the characters position.
     * 
     */
    moveCamera() {
        this.world.camera_x = -this.posX + 150;
    }


    /**
     * handles the characters dead and game over logic
     * 
     */
    handleCharacterDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.handleCharacterDeadSounds();
        setTimeout(() => {
            document.getElementById('looseGame').classList.remove('d-none');
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
            document.getElementById('winGameInfos').classList.add('d-flex');
            document.getElementById('winGameInfos').classList.remove('d-none');
            document.getElementById('winGameInfos').innerHTML = /*html*/`
                Verloren! Du hast ${this.world.statusBarCoin.countSessionCoins} Punkte erreicht.
            `;
            setTimeout(() => {
                document.getElementById('startButton').classList.remove('d-none');
            }, 2000);
        }, 1220);
    }


    /**
    * This is a help function to smaller the code
    * 
    */
    handleCharacterDeadSounds() {
        if (this.world.isSoundEnabled) {
            this.world.characterDeadSound.play();
            this.world.characterLongIdleSound.pause();
            this.world.characterWalkSound.pause();
            this.world.backgroundSoundOn = false;
            this.world.looseSound.play();
        }
    }


    /**
     * Handles the idle animation and plays the long idle animation after a certain idle time.
     * 
     */
    handleIdleAnimation() {
        this.world.characterLongIdleSound.pause();
        const currentTime = new Date();
        const idleTime = currentTime - this.lastActiveTime;
        const startLongIdle = 4000;
        if (idleTime >= startLongIdle) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.longIdleSound = true;
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.world.isSoundEnabled && this.longIdleSound) {
            this.world.characterLongIdleSound.play();
        }
    }


    /**
     * makes the character jump
     * 
     */
    jump() {
        this.speedY = 30;
        this.offsetY = this.speedY;
    }
}