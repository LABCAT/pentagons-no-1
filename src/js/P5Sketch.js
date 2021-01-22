import React, { useRef, useEffect } from "react";
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from '../audio/pentagons-no-1.mp3'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class FractalRoot {
    constructor(p5, radius) {
        this.p = p5;
        this.points = [];
        var centerX = this.p.width / 2;
        var centerY = this.p.height / 2;
        var angleStep = 360 / 5;
        var count = 0;
        for (var i = -90; i < 270; i += angleStep) {
            this.points[count] = new Point(
                centerX + (radius * this.p.cos(this.p.radians(i))),
                centerY + (radius * this.p.sin(this.p.radians(i))),
            )
            count++;
        }
        this.rootBranch = new Branch(p5, 0, 0, this.points);
    }

    drawShape() {
        this.rootBranch.draw();
    }
}

class Branch {
    constructor(p5, level, num, points) {
        this.p = p5;
        this.level = level;
        this.num = num;
        this.outerPoints = points;
        this.midPoints = this.calcMidPoints();
        // this.strutFactor = Settings.strutFactor;
        // this.projPoints = this.calcStrutPoints();
        this.maxLevel = 1;

        if (level + 1 < this.maxLevel) {
            // var childBranch = new Branch(level + 1, 0, this.projPoints);
            // childBranch.draw();
            //
            for (var k = 0; k < this.outerPoints.length; k++) {
                var kNext = (k - 1 + this.outerPoints.length) % this.outerPoints.length;
                var newPoints = [
                    this.projPoints[k], this.midPoints[k], this.outerPoints[k],
                    this.midPoints[kNext], this.projPoints[kNext],
                ];
                var subChildBranch = new Branch(level + 1, k + 1, newPoints);
                subChildBranch.draw();
            }
        }
    }

    draw() {
        var weight = (this.level < 5) ? 5 - this.level : 0.5;
        this.p.strokeWeight(weight);
        // draw outer shape
        for (var i = 0; i < this.outerPoints.length; i++) {
            var iNext = (i + 1) % this.outerPoints.length;
            this.p.line(this.outerPoints[i].x, this.outerPoints[i].y,
                this.outerPoints[iNext].x, this.outerPoints[iNext].y);
        }
    }

    calcMidPoints() {
        var midPoints = [];
        for (var i = 0; i < this.outerPoints.length; i++) {
            var iNext = (i + 1) % this.outerPoints.length;
            midPoints[i] = this.calcMidPoint(this.outerPoints[i], this.outerPoints[iNext]);
        }
        return midPoints;
    }

    calcMidPoint(end1, end2) {
        var mx = (end1.x > end2.x) ? end2.x + ((end1.x - end2.x) / 2)
            : end1.x + ((end2.x - end1.x) / 2);
        var my = (end1.y > end2.y) ? end2.y + ((end1.y - end2.y) / 2)
            : end1.y + ((end2.y - end1.y) / 2);
        return new Point(mx, my);
    }

}





const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

        p.cuesCompleted = [];

        p.notes = [
            {
                "duration": 2.264148,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 0,
                "time": 0,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.264148,
                "durationTicks": 61440,
                "midi": 67,
                "name": "G4",
                "ticks": 61440,
                "time": 2.264148,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999996,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 122880,
                "time": 4.528296,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000005,
                "durationTicks": 61440,
                "midi": 69,
                "name": "A4",
                "ticks": 184320,
                "time": 6.792444,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000005,
                "durationTicks": 61440,
                "midi": 62,
                "name": "D4",
                "ticks": 245760,
                "time": 9.056592,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 66,
                "name": "F#4",
                "ticks": 307200,
                "time": 11.32074,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000005,
                "durationTicks": 61440,
                "midi": 59,
                "name": "B3",
                "ticks": 368640,
                "time": 13.584888,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000005,
                "durationTicks": 61440,
                "midi": 72,
                "name": "C5",
                "ticks": 430080,
                "time": 15.849036,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 491520,
                "time": 18.113184,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000023,
                "durationTicks": 61440,
                "midi": 67,
                "name": "G4",
                "ticks": 552960,
                "time": 20.377332,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 614400,
                "time": 22.64148,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 69,
                "name": "A4",
                "ticks": 675840,
                "time": 24.905628,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000023,
                "durationTicks": 61440,
                "midi": 62,
                "name": "D4",
                "ticks": 737280,
                "time": 27.169776,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 66,
                "name": "F#4",
                "ticks": 798720,
                "time": 29.433924,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641480000000023,
                "durationTicks": 61440,
                "midi": 59,
                "name": "B3",
                "ticks": 860160,
                "time": 31.698072,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 72,
                "name": "C5",
                "ticks": 921600,
                "time": 33.96222,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 983040,
                "time": 36.226368,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 67,
                "name": "G4",
                "ticks": 1044480,
                "time": 38.490516,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.264148000000006,
                "durationTicks": 61440,
                "midi": 64,
                "name": "E4",
                "ticks": 1105920,
                "time": 40.754664,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 69,
                "name": "A4",
                "ticks": 1167360,
                "time": 43.018812000000004,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 62,
                "name": "D4",
                "ticks": 1228800,
                "time": 45.28296,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 66,
                "name": "F#4",
                "ticks": 1290240,
                "time": 47.547108,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 59,
                "name": "B3",
                "ticks": 1351680,
                "time": 49.811256,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 2.2641479999999987,
                "durationTicks": 61440,
                "midi": 72,
                "name": "C5",
                "ticks": 1413120,
                "time": 52.075404,
                "velocity": 0.7874015748031497
            },
            {
                "duration": 4.5282960000000045,
                "durationTicks": 122880,
                "midi": 64,
                "name": "E4",
                "ticks": 1474560,
                "time": 54.339552,
                "velocity": 0.7874015748031497
            }
        ];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.RGB, 255, 255, 255, 100);
            p.background(0);

            p.song = p.loadSound(audio);
            p.song.onended(p.logCredits);
            for (let i = 0; i < p.notes.length; i++) {
                p.song.addCue(p.notes[i].time, p.executeCue, (i + 1));
            }
        };

        p.draw = () => {
            
            
        };

        p.executeCue = (currentCue) => {

            if (!p.cuesCompleted.includes(currentCue)) {
                p.cuesCompleted.push(currentCue);
                if (currentCue < 26) {
                    p.clear();
                }
                p.drawSplatter((p.canvasWidth / 2) + currentCue, (p.canvasHeight / 2) + currentCue, 50 * currentCue, 10, p.notes.length - currentCue);
                p.drawSplatter(p.random(p.canvasWidth / 2), p.random(p.canvasHeight), 5 * currentCue, 10, currentCue);
                p.drawSplatter(p.random(p.canvasWidth / 2, p.canvasWidth), p.random(p.canvasHeight), 5 * currentCue, 10, currentCue);
            }
        }

        p.drawPentagons = (x, y, radius, level, opacity) => {
            const maxSize = (p.canvasWidth >= p.canvasHeight) ? p.canvasWidth : p.canvasheight;
            const startShapeSize = maxSize / 264;
            let x = startShapeSize;
            let opacity = 100;
            while (x < maxSize) {
                p.stroke(255, 0, 0, opacity);
                let fractalRoot = new FractalRoot(p, x);
                fractalRoot.drawShape();
                x = x + startShapeSize;
                opacity = opacity - 1;
            }
        }

        p.mousePressed = () => {
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                    p.reset();
                }
                document.getElementById("play-icon").classList.add("fade-out");
                p.canvas.addClass('fade-in');
                p.song.play();
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (!p.creditsLogged) {
                p.creditsLogged = true;
                console.log(
                    'Music By: http://labcat.nz/',
                    '\n',
                    'Animation By: https://github.com/LABCAT/pentagons-no-1',
                    '\n',
                    'Code Inspiration: https://github.com/tex2e/p5js-pentagon'
                );
                p.song.stop();
            }

        }

        p.reset = () => {
            p.clear();
            p.cuesCompleted = [];
        };

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
