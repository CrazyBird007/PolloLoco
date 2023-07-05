let canvas;
let world;
let keyboard = new Keyboard();


/**
 * This function initializes the canvas for drawing and the game world with various game-related information.
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    buttonTouchEvents();
    console.log('My world is:', world.character, world.enemies, world.backgroundObjects, world.clouds); 
}

function stopAllSoundsInWorld() {
    // world.stopAllSounds();
    world.isSoundEnabled = false;  
    console.log('sound ausgestellt')
}

function enableAllSounds() {
    world.isSoundEnabled = true;
    console.log('sound angestellt')
}

/**
 * This function sets the `key` variable to true based on the keyboard event.
 * 
 * @param {Event} e - The keyboard event object.
 */
document.onkeydown = function (e) {
    // console.log('key:', e);  // Logs the key being pressed, useful for identifying key values
    if (e.key === "ArrowRight" || e.key === "d") {
        keyboard.RIGHT = true;
    }
    else if (e.key === "ArrowLeft" || e.key === "a") {
        keyboard.LEFT = true;
    }
    else if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        keyboard.UP = true;
    }
    else if (e.key === "ArrowDown" || e.key === "s") {
        keyboard.DOWN = true;
    }
    else if (e.key === "Enter" || e.key === "f") {
        keyboard.F = true;
    }
};


/**
 * This function handles the key release event and updates the `keyboard` object accordingly.
 * 
 * @param {Event} e - The keyboard event object.
 */
document.onkeyup = function (e) {
    if (e.key === "ArrowRight" || e.key === "d") {
        keyboard.RIGHT = false;
    }
    else if (e.key === "ArrowLeft" || e.key === "a") {
        keyboard.LEFT = false;
    }
    else if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        keyboard.UP = false;
    }
    else if (e.key === "ArrowDown" || e.key === "s") {
        keyboard.DOWN = false;
    }
    else if (e.key === "Enter" || e.key === "f") {
        keyboard.F = false;
    }
};


/**
 * This function sets up touch event listeners for various buttons in the mobile game UI and updates the `keyboard` object accordingly.
 * 
 */
function buttonTouchEvents() {
    document.getElementById('leftButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('leftButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('rightButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('rightButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('jumpButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('throwButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.F = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.F = false;
    });

    document.getElementById('startButton').addEventListener('touchstart', (e) => { 
        e.preventDefault();
        initLevel1();
        init();
    });

    document.getElementById('helpButtonSmall').addEventListener('touchstart', (e) => {
        e.preventDefault();
        showPopup();
    });
}


/**
 * This function enters fullscreen mode for the game canvas and adjusts its size to fill the entire viewport.
 * 
 */
function fullscreen() {
    let canvasFullscreen = document.getElementById('canvas');
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    canvasFullscreen.style.width = '100vw';
    canvasFullscreen.style.height = '100vh';
}


/**
 * Requests fullscreen mode for the specified element, using different methods based on browser compatibility.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * Registers event listeners for fullscreen change events across different browser vendors.
 * The specified handler function will be called whenever a fullscreen change event occurs.
 *
 * @param {Function} handleFullscreenChange - The handler function to be called on fullscreen change.
 */
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);


/**
 * Handles the fullscreen change event by adjusting the size of the game canvas back to its original dimensions
 * if the fullscreen mode is exited.
 * 
 */
function handleFullscreenChange() {
    let canvasFullscreen = document.getElementById('canvas');
    let originalCanvasWidth = 853;
    let originalCanvasHeight = 480;
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        canvasFullscreen.style.width = originalCanvasWidth + 'px';
        canvasFullscreen.style.height = originalCanvasHeight + 'px';
    }
}


/**
 * Shows the help window popup by setting its display style to "block".
 * 
 */
function showPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}


/**
 * Closes the help window popup by setting its display style to "none".
 * 
 */
function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}


/**
 * Prevents the closing of the popup content when clicked on.
 * 
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}