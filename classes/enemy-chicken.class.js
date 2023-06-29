class EnemyChicken extends MovableObject {
    height = 100;
    width = 100;
    posY = 365;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];



    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.posX = 300 + Math.random() * 1000;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.12;
    }

    animate() {
        setInterval(() => {//alle 144 sec. wird die function ausgeführt wo immer 0.12 px abgezogen werden, so bewegt sich die wolke
            this.moveLeft();
        }, 1000 / 144); //144 FPS , oft nimmt man auch 60

        setInterval(() => {
            // let i = this.currentImage % this.IMAGES_WALKING.length; 
            // let path = this.IMAGES_WALKING[i]; 
            // this.img = this.imageCache[path];
            // this.currentImage++;
            this.playAnimation(this.IMAGES_WALKING); // die oeberen 4 zeilen ausgelagert in die playanimation() in movable objects
        }, 280);
    }
}