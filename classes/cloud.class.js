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
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
    }
}
