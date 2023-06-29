class BackgroundObject extends MovableObject {
    // width = 720;    // so hatte ich es vor video 13 / 14 
    // height = 480;
    posX = 0;
    posY = 0;


    // constructor(imagePath) {
    //     super().loadImage(imagePath);
    // }

    width = 720;
    height = 480;

    
    constructor(imagePath, posX, posY) {
        super().loadImage(imagePath);
        this.posX = posX;
        this.posY = posY;
    }
}