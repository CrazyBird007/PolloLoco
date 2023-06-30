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


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
        this.posX = 0;
        this.posY = 60;
        this.width = 90;
        this.height = 30;
    }

    updateCoinStatusBar() {
        this.percentage += 8; // 100 / coin menge = percentage wert um bei allen coins 100 zu haben...
        if (this.percentage > 100) {
          this.percentage = 100; // Stelle sicher, dass der Wert der percentage-Variable nicht über 100 geht
        }
    
        let imageIndex = this.resolveImageIndex(this.percentage); // Ermittle den Index des entsprechenden Bildes
        let imagePath = this.IMAGES[imageIndex]; // Hole den Pfad des Bildes basierend auf dem Index
        this.img = this.imageCache[imagePath]; // Setze das Bild in der StatusBar
    
        // Weitere Aktionen oder Logik nach der Aktualisierung der StatusBar...
      }
    
      // Weitere Methoden der StatusBarCoin-Klasse...
}