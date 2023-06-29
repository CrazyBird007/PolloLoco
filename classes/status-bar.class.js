class StatusBarHealth extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', //bild 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',//bild 1
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png', //2
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',//3
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', // bild 4
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png', // bild 5
    ];
    percentage = 100;

    constructor() {
        super();
        // super().loadImage('./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.posX = 0;
        this.posY = -15;
        this.width = 130;
        this.height = 50;
    }


    setPercentage(percentage) { //setPercentage(50);
        this.percentage = percentage; //aus der zahl percentage muss eine zahl zwischen 0 und 5 ermittelt werden (images.length)
        let path = this.IMAGES[this.resolveImageIndex(this.percentage)]; //in der resolveimageindex kommt eine zahl von 0-5 raus also wird an diese stelle im array zugegriffen
        this.img = this.imageCache[path]
    }


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