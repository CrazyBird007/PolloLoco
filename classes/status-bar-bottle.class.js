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


  updateBottleStatusBar() {
    this.percentage += 17; // 100 / bottle menge = percentage wert um bei allen bottles 100 zu haben...
    if (this.percentage > 100) {
      this.percentage = 100;
    }
    let imageIndex = this.resolveImageIndex(this.percentage);
    let imagePath = this.IMAGES[imageIndex];
    this.img = this.imageCache[imagePath];
  }


  updateBottleStatusBarWhenThrow() {
    this.percentage -= 17;// 100 / bottle menge = percentage wert um bei allen bottles 100 zu haben...
    if (this.percentage > 100) {
      this.percentage = 100;
    }
    let imageIndex = this.resolveImageIndex(this.percentage);
    let imagePath = this.IMAGES[imageIndex];
    this.img = this.imageCache[imagePath];
  }
}