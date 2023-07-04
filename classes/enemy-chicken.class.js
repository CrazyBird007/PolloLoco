class EnemyChicken extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    energy = 100;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];



    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.posX = 300 + Math.random() * 10000; //lässt die gegner random auf der x achse spawnen
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.12;
    }

    animate() {
        this.moveInterval = setInterval(() => {//alle 144 sec. wird die function ausgeführt wo immer 0.12 px abgezogen werden, so bewegt sich die wolke
            this.moveLeft();
        }, 1000 / 144); //144 FPS , oft nimmt man auch 60

        this.animationInterval = setInterval(() => {
            // let i = this.currentImage % this.IMAGES_WALKING.length; 
            // let path = this.IMAGES_WALKING[i]; 
            // this.img = this.imageCache[path];
            // this.currentImage++;
            this.playAnimation(this.IMAGES_WALKING); // die oeberen 4 zeilen ausgelagert in die playanimation() in movable objects
        }, 280);
    }

    hit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }
}