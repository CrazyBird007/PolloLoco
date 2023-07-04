class BackgroundObject extends MovableObject {
    posX = 0;
    posY = 0;
    width = 720;
    height = 480;

    
    constructor(imagePath, posX, posY) {
        super().loadImage(imagePath);
        this.posX = posX;
        this.posY = posY;
    }
}