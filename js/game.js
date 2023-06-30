let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // der parameter canvas wird an den constructor der world class weitergegeben
    buttonTouchEvents();
    console.log('My world is:', world.character, world.enemies, world.backgroundObjects, world.clouds);
}


document.onkeydown = function (e) {
    // console.log('key:', e);  //loggt aus, welche taste man drückt, so kann man herausfinden welche keys sie haben
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
}





// starts fullscreen with button and leave fullscreen with press Escape
function fullscreen() {
    let canvasFullscreen = document.getElementById('canvas');
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    canvasFullscreen.style.width = '100vw';
    canvasFullscreen.style.height = '100vh';
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);


function handleFullscreenChange() {
    let canvasFullscreen = document.getElementById('canvas');
    let originalCanvasWidth = 853;
    let originalCanvasHeight = 480;
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        canvasFullscreen.style.width = originalCanvasWidth + 'px';
        canvasFullscreen.style.height = originalCanvasHeight + 'px';
    }
}