class World {
    character = new Character();
    level = level1;
    canvas; // lokale variable für in der draw function
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];
    collectedBottles = 0;
    bottle;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // setzt die variable canvas lokal in der world class
        this.keyboard = keyboard;
        this.draw(); //ruft die draw() funktion auf
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this; // hier wird mit = this alles aus der world übergeben damit man auf alles zugreifen kann im char.
    } // man greift auf character auf die variable world dort zu und setzt die variablen von hier da rein


    run() {  //hier wird x mal pro sec. geprüft ob elemente ind er welt miteinander collidieren oder nicht
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
        }, 250);
    }


    checkThrowObjects() {
        if (this.keyboard.F && this.collectedBottles > 0) {
            this.bottle = new ThrowableObject(this.character.posX + 75, this.character.posY + 130);
            this.throwableObjects.push(this.bottle);
            this.collectedBottles--; //zieht wieder eine bottle ab wenn man wirft
            this.statusBarBottle.updateBottleStatusBarWhenThrow(); //zieht bottles von der statusbar ab
            console.log('current bottles:', this.collectedBottles);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => { //für gegner eigene sachen einstellen wie playanimation
            this.throwableObjects.forEach((object) => {
                if (object.isCollidingEnemy(enemy) && !object.hasHitEnemy) { //schaut ob die flasche schonmal getroffen hat
                    console.log('Flasche trifft Gegner / objekt', enemy, object);
                    object.hasHitEnemy = true; // Setze das Attribut hashitenemy auf true
                    let enemyIndex = this.level.enemies.indexOf(enemy);
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        console.log('bottle trifft Endboss Leben:', enemy.energy);
                        if (enemy.isDead()) {
                            enemy.playAnimation(enemy.IMAGES_DEAD);
                            setTimeout(() => {
                                document.getElementById('looseGame').classList.remove('d-none'); //hier muss noch der win -screen angezeigt werden!!!
                                for (let i = 1; i < 9999; i++) window.clearInterval(i); //stoppt alle intervalle 
                                document.getElementById('startButton').classList.remove('d-none');
                                document.getElementById('winGameInfos').classList.add('d-flex');
                                document.getElementById('winGameInfos').innerHTML = /*html*/`
                                    Gewonnen! Du hast ${this.statusBarCoin.countSessionCoins} Punkte erreicht, Glückwunsch!
                                `;
                            }, 1220);
                        }
                    } else if (enemy instanceof EnemyChicken && !enemy.isDead() || enemy instanceof SmallEnemyChicken && !enemy.isDead()) {
                        enemy.hit();
                        console.log('bottle trifft normalen Gegner Leben:', enemy.energy);
                        if (enemy.isDead()) {
                            enemy.playAnimation(enemy.IMAGES_DEAD);

                            setTimeout(() => {
                                this.level.enemies.splice(enemyIndex, 1);
                            }, 1500);
                        }
                    }
                    console.log('enemyindex:', enemyIndex);
                }
            });
        });

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                let enemyIndex2 = this.level.enemies.indexOf(enemy);
                if (this.character.isAboveGround()) {
                    enemy.hit();
                    console.log('springe auf gegner !! leben:', enemy.energy);
                    if (enemy.isDead()) {
                        enemy.playAnimation(enemy.IMAGES_DEAD);
                        this.level.enemies.splice(enemyIndex2, 1);
                    }
                } else {
                    console.log('Character collision with:', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('after collision energy from character:', this.character.energy);
                }
            }
        });

        this.level.clouds.forEach((cloud) => {
            if (this.character.isColliding(cloud)) {
                if (cloud instanceof Coin) {
                    console.log('Character collided with coin:', cloud);
                    this.removeCoin(cloud);
                    this.statusBarCoin.updateCoinStatusBar();
                    this.statusBarCoin.countSessionCoins++;
                    console.log('session coins:', this.statusBarCoin.countSessionCoins);
                } else if (cloud instanceof Bottle) {
                    console.log('Character collided with bottle:', cloud);
                    this.removeBottle(cloud);
                    this.statusBarBottle.updateBottleStatusBar();
                    this.collectedBottles++;
                    console.log('current bottles:', this.collectedBottles);
                }
            }
        });
    }


    removeCoin(coin) {
        // Entferne das Coin-Objekt aus dem Spiel
        let coinIndex = this.level.clouds.indexOf(coin);
        if (coinIndex !== -1) {
            this.level.clouds.splice(coinIndex, 1);
        }
        // Weitere Aufräumarbeiten oder Aktionen...
    }


    removeBottle(bottle) {
        // Entferne das Bottle-Objekt aus dem Spiel
        let bottleIndex = this.level.clouds.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.level.clouds.splice(bottleIndex, 1);
        }
        // Weitere Aufräumarbeiten oder Aktionen...
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //nun kann man auf die lokale canvas var. zugreifen

        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera x nach links , y wird um 0 verschoben

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);



        this.ctx.translate(-this.camera_x, 0); //verschiebt die kamera zurück damit die statusbar nicht bewegt wird (ende des verschiebens)
        // ---------------------------- space for fixed objects---------------------------------------
        this.addToMap(this.statusBar); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarBottle); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarCoin); //fügt die statusbar zur map hinzu
        // console.log('wieso klappt es nicht');
        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera wieder damit sich alle bilder bewegen wie oben bei dem selben code



        this.addToMap(this.character);   //neu, so muss man nur 1 variable weitergeben rest geht automatisch
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0); // verschiebt die kamera wieder zurück


        let self = this;    // das wort this. funktioniert in einer function in einer function nicht deswegen wird self initialisiert
        requestAnimationFrame(function () { //sooft die grafikkarte kann (FPS) wird die funktion hier ausgeführt
            self.draw();                    //sie ruft in dem sinne this.draw() auf also sich selber asynchron auf
            // aber erst wenn alles vorherige in der draw() geladen ist
        });
    }


    addObjectsToMap(objects) { //objects ist der übergebene parameter der das foreach aufruft
        objects.forEach(obj => {  //hier wird dann obj an stelle [i] definiert was addToMap mitgegeben wird
            this.addToMap(obj);
        });
    }


    addToMap(object) { //hilfsfunktion die durch den parameter immer das selbe ausführt für alle tasks in draw()
        if (object.otherDirection) { // guckt ob otherdirection true ist dann wird es ausgeführt sonst nicht
            this.saveAndMirrorImage(object);
        }
        try { // es wird versucht die nächste zeile auszuführen, wenn alles gut ist geht es weiter, wenn nicht wird im catch gezeigt
            object.draw(this.ctx);
            object.drawFrameBorder(this.ctx);
        } catch (e) { // dann wird hier der fehler gefangen und in den console.log angezeigt!
            console.warn('Error loading image', e); // zeigt den error in der konsole
            console.log('Could not load image:', object.img.src); // zeigt welche src also welches img das problem ist
        }
        if (object.otherDirection) {
            this.restoreAndMirrorImageBack(object);
        }
    }


    saveAndMirrorImage(object) {
        this.ctx.save(); //speichert den ganzen canvas context (ctx), alle dessen eigenschaften
        this.ctx.translate(object.width, 0); // verschiebt im canvas an der x achse um die breite des elements
        this.ctx.scale(-1, 1); //durch -1 auf der x achse und 1 auf der y achse wird das ganze bild horizontal gespiegelt
        object.posX = object.posX * -1; // ändert /spiegelt die position des objects auf der x achse sodass es an 
        //der selben stelle gespiegelt erscheint
    }


    restoreAndMirrorImageBack(object) {
        object.posX = object.posX * -1; // ändert/spiegelt die spiegelung zurück
        this.ctx.restore(); // hier wird der canvas wieder geladen (alles normal außer das gespiegelte bild (character))
    }
}