export default class Pentagon {

    /**
     * Inspiration:
     * 
     * https://gaweph.github.io/p5-typescript-starter/
     * https://editor.p5js.org/wintyo/sketches/6aiF8y8V_
     * https://github.com/tex2e/p5js-pentagon
     * https://editor.p5js.org/unicornCoder/sketches/z1W5mj2Kj
     * https://openprocessing.org/sketch/955445/ 
     */

    constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.speed = 6;
        this.size = p.width / 8;
        this.growth = parseInt(p.random(3, 9));
        this.edges = parseInt(p.random(16, 32));
        this.seed =  p.random(1, 100);
        this.fillHue = p.random(0, 360);
        this.strokeHue = p.random(0, 360);
        this.rotationAngle = 0;
        this.rotationDirection = Math.random() > 0.5 ? 'clockwise' : 'anti-clockwise';
        this.canRotate = Math.random() > 0.5;
    }

    update () {
        this.size = this.size + this.speed;
        this.rotationAngle = this.rotationDirection === 'clockwise' ? this.rotationAngle + (this.speed / 24) : this.rotationAngle - (this.speed / 24);
    }

    draw () {
        const angle = 360 / 5;
        this.p.fill(this.fill);
        this.p.stroke(this.stroke);
        this.p.beginShape();
        for (let a = 0; a < 360; a += angle) {
            let sx = this.x + this.p.cos(a) * this.radius;
            let sy = this.y + this.p.sin(a) * this.radius;
            this.p.vertex(sx, sy);
        }
        this.p.endShape(this.p.CLOSE);
    }
}