class Character {

    constructor(ctx, stage, keyboard) {
        this.x = 405;
        this.y = 500;
        this.width = 50;
        this.height = 50;
        this.color = 'yellow';
        this.jumpingPower = 7;
        this.collideLeft = false;
        this.collideRight = false;
        this.collideUp = false;
        this.collideDown = false;
        this.ctx = ctx;
        this.stage = stage;
        this.keyboard = keyboard;

        this.gravity = 0.4;
        this.friction = 0.9;
        this.vx = 2;
        this.vy = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.detectCollisions();
        this.move();
        this.applyGravity();
    }

    detectCollisions() {
        const elements = this.getPosibleElementToCollide();
        if (this.isCollidingVertical(elements)) {
            this.vy = 0;
        }
        if (this.isCollidingHorizontal(elements)) {
            this.vx = 0;
        }
    }

    getPosibleElementToCollide() {
        return this.stage.elements.filter(e =>
            e.x > this.x + this.vx - 100 &&
            e.y > this.y + this.vy - 100 &&
            e.x < this.x + this.vx + this.width + 100 &&
            e.y < this.y + this.vy + this.height + 100 &&
            e.type === Constants.WALL
        );
    }

    isCollidingVertical(elements) {
        if (this.isCollidingByUp(elements)) {
            this.collideUp = true;
            return true;
        } else if (this.isCollidingByDown(elements)) {
            this.collideDown = true;
            return true;
        } else {
            this.collideUp = false;
            this.collideDown = false;
            return false;
        }
    }

    isCollidingHorizontal(elements) {
        if (this.isCollidingByLeft(elements)) {
            this.collideLeft = true;
            return true;
        } else if (this.isCollidingByRight(elements)) {
            this.collideRight = true;
            return true;
        } else {
            this.collideLeft = false;
            this.collideRight = false;
            return false;
        }
    }

    isCollidingByLeft(elements) {
        const p2 = {
            x: this.x + this.vx + this.width + 5,
            y: this.y + this.vy + 5
        };
        const p3 = {
            x: this.x + this.vx + this.width + 5,
            y: this.y + this.vy + this.height - 5
        };

        // console.log("LEFT",p2, p3, elements);
        return elements.some(e =>
            this.isInboundOf(p2, e) ||
            this.isInboundOf(p3, e)
        );
    }

    isCollidingByRight(elements) {
        const p1 = {
            x: this.x + this.vx - 5,
            y: this.y + this.vy - 5
        };
        const p4 = {
            x: this.x + this.vx - 5,
            y: this.y + this.vy + this.height - 5
        };

        // console.log("RIGHT", p1, p4, elements);
        return elements.some(e =>
            this.isInboundOf(p1, e) ||
            this.isInboundOf(p4, e)
        );
    }

    isCollidingByUp(elements) {
        const p1 = {
            x: this.x + this.vx,
            y: this.y + this.vy
        };
        const p2 = {
            x: this.x + this.vx + this.width,
            y: this.y + this.vy
        };

        // console.log("UP", p1, p2, elements);
        return elements.some(e =>
            this.isInboundOf(p1, e) ||
            this.isInboundOf(p2, e)
        );
    }

    isCollidingByDown(elements) {
        const p3 = {
            x: this.x + this.vx + this.width,
            y: this.y + this.vy + this.height
        };
        const p4 = {
            x: this.x + this.vx,
            y: this.y + this.vy + this.height
        };

        // console.log("DOWNN", p3, p4, elements);
        return elements.some(e =>
            this.isInboundOf(p3, e) ||
            this.isInboundOf(p4, e)
        );
    }

    isInboundOf(p, e) {
        return p.x >= e.x && p.x <= e.x + e.width &&
            p.y >= e.y && p.y <= e.y + e.height;
    }

    applyGravity() {
        this.vy += this.collideDown ? 0 : this.gravity;
        this.y += this.vy;
    }

    move() {
        if (this.keyboard.keys[Constants.KEY_LEFT]) {
            this.vx = this.collideRight ? 0 : -5;
        }
        if (this.keyboard.keys[Constants.KEY_RIGHT]) {
            this.vx = this.collideLeft ? 0 : 5;
        }
        if (this.keyboard.keys[Constants.KEY_UP]) {
            this.vy += this.collideDown ? -this.jumpingPower : 0;
            this.y += this.vy;
        }
        
        this.vx *= this.friction;
        this.x += this.vx;

    }
}