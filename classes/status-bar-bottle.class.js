class StatusBarBottle extends StatusBarHealth {
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.posX = 0;
        this.posY = 25;
        this.width = 110;
        this.height = 40;
    }
}