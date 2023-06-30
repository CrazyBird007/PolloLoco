class Cloud extends MovableObject {
    posY = 0;
    width = 720;
    height = 480;
    speed = 0.12;
    posX = 300;
    IMAGES_CLOUDS = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
    ];

    constructor() {
        super();
        // super().loadImage('./img/5_background/layers/4_clouds/1.png'); //ersetzt durch die chooserandom function
        this.posX = -100 + Math.random() * 8000;
        this.speed = 0.09 + Math.random() * 1;
        this.animateCloud();
        this.chooseRandomImage();
    }

    chooseRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_CLOUDS.length);
        let randomImage = this.IMAGES_CLOUDS[randomIndex];
        this.loadImage(randomImage);
      }

    animateCloud() {
        setInterval(() => {//alle 144 sec. wird die function ausgeführt wo immer 0.12 px abgezogen werden, so bewegt sich die wolke
            this.moveLeft();
        }, 1000 / 60); //144 FPS , oft nimmt man auch 60
    }
}
