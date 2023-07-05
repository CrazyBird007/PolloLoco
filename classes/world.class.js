class World {
    character = new Character();
    level = level1;
    canvas;
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
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {  //hier wird x mal pro sec. geprüft ob elemente ind er welt miteinander collidieren oder nicht
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
        }, 100);
    }


    checkThrowObjects() {
        if (this.keyboard.F && this.collectedBottles > 0) {
            this.bottle = new ThrowableObject(this.character.posX + 75, this.character.posY + 130);
            this.throwableObjects.push(this.bottle);
            this.collectedBottles--;
            this.statusBarBottle.updateBottleStatusBarWhenThrow();
            console.log('current bottles:', this.collectedBottles);
        }
    }


    checkCollisions() {
        this.checkThrowableObjectCollisions();
        this.checkCharacterEnemyCollisions();
        this.checkCharacterCloudCollisions();
    }


    checkThrowableObjectCollisions() {
        this.level.enemies.forEach((enemy) => {
            let enemyIndex = this.level.enemies.indexOf(enemy);
            this.throwableObjects.forEach((object) => {
                if (enemy.isDead()) {
                    return;
                }
                if (object.isCollidingEnemy(enemy) && !object.hasHitEnemy) {
                    console.log('Flasche trifft Gegner / objekt', enemy, object);
                    object.hasHitEnemy = true;
                    if (enemy instanceof Endboss) {
                        this.handleEndbossCollision(enemy);
                    } else if ((enemy instanceof EnemyChicken || enemy instanceof SmallEnemyChicken) && !enemy.isDead()) {
                        this.handleNormalEnemyCollision(enemy, enemyIndex);
                    }
                    console.log('enemyindex:', enemyIndex);
                }
            });
        });
    }


    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                let enemyIndex2 = this.level.enemies.indexOf(enemy);
                if (this.character.isAboveGround()) {
                    if (enemy instanceof EnemyChicken && !enemy.isDead() || enemy instanceof SmallEnemyChicken && !enemy.isDead()) {
                        this.handleCharacterJumpCollision(enemy, enemyIndex2);
                    } else {
                        console.log('Character collision with:', enemy);
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        console.log('after collision energy from character:', this.character.energy);
                    }
                } else {
                    console.log('Character collision with:', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('after collision energy from character:', this.character.energy);
                }
            }
        });
    }


    checkCharacterCloudCollisions() {
        this.level.clouds.forEach((cloud) => {
            if (this.character.isColliding(cloud)) {
                if (cloud instanceof Coin) {
                    this.handleCoinCollision(cloud);
                } else if (cloud instanceof Bottle) {
                    this.handleBottleCollision(cloud);
                }
            }
        });
    }


    handleEndbossCollision(enemy) {
        enemy.hit();
        console.log('bottle trifft Endboss Leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            setTimeout(() => {
                document.getElementById('looseGame').classList.remove('d-none');
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
                document.getElementById('startButton').classList.remove('d-none');
                document.getElementById('winGameInfos').classList.add('d-flex');
                document.getElementById('winGameInfos').innerHTML = /*html*/`
                    Gewonnen! Du hast ${this.statusBarCoin.countSessionCoins} Punkte erreicht, Glückwunsch!
                `;
            }, 1500);
        } else {
            enemy.playAnimation(enemy.IMAGES_HURT);
            enemy.intervalId = setInterval(() => {
                if (enemy.energy > 0) {
                    enemy.playAnimation(enemy.IMAGES_WALK);
                    enemy.posX -= 2;
                }
            }, 100);
        }
    }

    handleNormalEnemyCollision(enemy, enemyIndex) {
        enemy.hit();
        console.log('bottle trifft normalen Gegner Leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 3000);
        }
    }


    handleCharacterJumpCollision(enemy, enemyIndex) {
        enemy.hit();
        console.log('springe auf gegner !! leben:', enemy.energy);
        if (enemy.isDead()) {
            enemy.playAnimation(enemy.IMAGES_DEAD);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 3000);
        }
    }


    handleCoinCollision(coin) {
        console.log('Character collided with coin:', coin);
        this.removeCoin(coin);
        this.statusBarCoin.updateCoinStatusBar();
        this.statusBarCoin.countSessionCoins++;
        console.log('session coins:', this.statusBarCoin.countSessionCoins);
    }


    handleBottleCollision(bottle) {
        console.log('Character collided with bottle:', bottle);
        this.removeBottle(bottle);
        this.statusBarBottle.updateBottleStatusBar();
        this.collectedBottles++;
        console.log('current bottles:', this.collectedBottles);
    }


    removeCoin(coin) {
        let coinIndex = this.level.clouds.indexOf(coin);
        if (coinIndex !== -1) {
            this.level.clouds.splice(coinIndex, 1);
        }
    }


    removeBottle(bottle) {
        let bottleIndex = this.level.clouds.indexOf(bottle);
        if (bottleIndex !== -1) {
            this.level.clouds.splice(bottleIndex, 1);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera x nach links , y wird um 0 verschoben
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //verschiebt die kamera zurück damit die statusbar nicht bewegt wird (ende des verschiebens)
        // ---------------------------- space for fixed objects---------------------------------------
        this.addToMap(this.statusBar); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarBottle); //fügt die statusbar zur map hinzu
        this.addToMap(this.statusBarCoin); //fügt die statusbar zur map hinzu
        this.ctx.translate(this.camera_x, 0); // verschiebt die kamera wieder damit sich alle bilder bewegen wie oben bei dem selben code

        this.addToMap(this.character);   //neu, so muss man nur 1 variable weitergeben rest geht automatisch
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); // verschiebt die kamera wieder zurück

        let self = this;    // das wort this. funktioniert in einer function in einer function nicht deswegen wird self initialisiert
        requestAnimationFrame(function () { //sooft die grafikkarte kann (FPS) wird die funktion hier ausgeführt
            self.draw();                    //sie ruft in dem sinne this.draw() auf also sich selber asynchron auf
        });                                  // aber erst wenn alles vorherige in der draw() geladen ist
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }


    addToMap(object) {
        if (object.otherDirection) {
            this.saveAndMirrorImage(object);
        }
        try {
            object.draw(this.ctx);
            // object.drawFrameBorder(this.ctx); // malt die collisionsboxen um die characters und coins etc.
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image:', object.img.src);
        }
        if (object.otherDirection) {
            this.restoreAndMirrorImageBack(object);
        }
    }


    saveAndMirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.posX = object.posX * -1;
    }


    restoreAndMirrorImageBack(object) {
        object.posX = object.posX * -1;
        this.ctx.restore();
    }
}