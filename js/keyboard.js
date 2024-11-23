class Keyboard {

    constructor() {
        this.keys = Array(150).fill(false);
    }
    
    onKeyDown(event) {
        this.keys[event.keyCode] = true;
        
    }
    
    onKeyUp(event) {
        this.keys[event.keyCode] = false;
        
    }

}