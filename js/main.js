const canvas = document.getElementById('canvas');
const keyboard = new Keyboard();
const mainLoop = new MainLoop({
    canvas, keyboard
});

function init() {
    setInterval(
        () => mainLoop.start(),
        Constants.FRAMES_IN_ONE_SECOND
    );

};

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(e) {
    keyboard.onKeyDown(e);
}
function onKeyUp(e) {
    keyboard.onKeyUp(e);
}