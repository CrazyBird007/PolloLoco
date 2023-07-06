/**
* Represents a status bar for health in the game.
* @extends DrawableObject
*/
class StatusBarHealth extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    percentage = 100;


    /**
     * Creates a new instance of StatusBarHealth.
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.posX = 0;
        this.posY = -15;
        this.width = 130;
        this.height = 50;
    }


    /**
    * Sets the percentage value of the health status bar.
    * 
    * @param {number} percentage - The percentage value to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(this.percentage)];
        this.img = this.imageCache[path]
    }


    /**
    * Resolves the image index based on the current percentage value.
    * 
    * @returns {number} - The resolved image index.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 70) {
            return 4;
        } else if (this.percentage > 50) {
            return 3;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}