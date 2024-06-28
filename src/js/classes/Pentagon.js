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

    constructor(p, x, y, fill, stroke, includeSubSet) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.speed = p.random(p.width / 512, p.width / 256);
        this.size = p.width / 128;
        this.fill = fill;
        this.stroke = stroke;
        this.rotationAngle = 0;
        this.rotationDirection = Math.random() > 0.5 ? 'clockwise' : 'anti-clockwise';
        this.innerPentagons = [];
    }

    update () {
        this.size = this.size + this.speed;
        this.rotationAngle = this.rotationDirection === 'clockwise' ? this.rotationAngle + (this.speed / 24) : this.rotationAngle - (this.speed / 24);
    }

    draw () {
        this.p.fill(this.fill);
        this.p.stroke(this.stroke);
        this.p.strokeWeight(this.p.width / 128);
        this.p.push();
        // this.p.translate(translateX, translateY);
        this.p.rotate(this.rotationAngle);
        this.p.beginShape();
        for (let a = 0; a < 360; a += (360 / 5)) {
            let sx = this.x + this.p.cos(a) * this.size;
            let sy = this.y + this.p.sin(a) * this.size;
            this.p.vertex(sx, sy);
        }
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
    }
}