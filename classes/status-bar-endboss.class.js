/**
* Represents a status bar for endbosshealth in the game.
* @extends StatusBarHealth
*/
class StatusBarEndboss extends StatusBarHealth {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];
    percentage = 100;


    /**
     * Creates a new instance of Statusbarendbosshealth
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.posX = 720;
        this.posY = -9;
        this.width = 130;
        this.height = 50;
    }


    /**
     * Updates the endboss status bar based on the current percentage.
     * 
     */
    updateEndbossStatusBar() {
        this.percentage -= 34;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        let imageIndex = this.resolveImageIndex(this.percentage);
        let imagePath = this.IMAGES[imageIndex];
        this.img = this.imageCache[imagePath];
    }
}