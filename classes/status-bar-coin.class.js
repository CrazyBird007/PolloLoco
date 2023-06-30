class StatusBarCoin extends StatusBarHealth {
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.posX = 0;
        this.posY = 60;
        this.width = 90;
        this.height = 30;
    }
}