class MainLoop {

    constructor(inputs) {
        const { canvas, keyboard } = inputs;
        this.canvas = canvas;
        this.ctx = canvas.getContext(Constants.TWO_DIMENSIONS);
        this.keyboard = keyboard;
        
        this.stage = new Stage(this.ctx);
        this.character = new Character(this.ctx, this.stage, this.keyboard);
    }


    start() {
        this.update();
        this.draw();
    }

    update() {
        this.clear();
        this.character.update();

    }

    draw() {
        this.stage.draw();
        this.character.draw();

    }

    clear() {
        this.canvas.width = window.innerWidth-50;
        this.canvas.height = window.innerHeight-50;
    }

}