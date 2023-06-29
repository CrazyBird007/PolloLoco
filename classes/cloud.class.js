class Cloud extends MovableObject {
    posY = 0;
    width = 720;
    height = 480;
    // speed = 0.12;


    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.posX = -100 + Math.random() * 500;
        this.animateCloud();
    }

    animateCloud() { 
        this.moveLeft();
    }

}
