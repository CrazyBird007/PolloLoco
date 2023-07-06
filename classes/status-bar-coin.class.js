/**
* Represents a status bar for coins in the game.
* @extends StatusBarHealth
*/
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
  countSessionCoins = 0;


  /**
   * Creates a new instance of StatusBarCoin
   * 
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.posX = 0;
    this.posY = 60;
    this.width = 90;
    this.height = 30;
  }


  /**
   * Updates the coin status bar based on the current percentage.
   * 
   */
  updateCoinStatusBar() {
    this.percentage += 8; //  100 / coin menge = percentage wert um bei allen coins 100 zu haben... 
    if (this.percentage > 100) {   //(funktioniert nur bei einem level oder gleichbleibenden coinmengen)
      this.percentage = 100;
    }
    let imageIndex = this.resolveImageIndex(this.percentage);
    let imagePath = this.IMAGES[imageIndex];
    this.img = this.imageCache[imagePath];
  }
}