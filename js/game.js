let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // der parameter canvas wird an den constructor der world class weitergegeben

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
    // else if (e.key === " ") {
    //     keyboard.SPACE = true;
    // }
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
    // else if (e.key === " ") {
    //     keyboard.SPACE = false;
    // }
};