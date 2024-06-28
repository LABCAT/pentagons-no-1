import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import { TetradicColourCalculator } from './functions/ColourCalculators.js';
import Pentagon from './classes/Pentagon.js';

import audio from "../audio/pentagons-no-1.ogg";
import midi from "../audio/pentagons-no-1.mid";

/**
 * Circles No. 8
 * Inspiration: https://openprocessing.org/sketch/505090
 */
const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.bpm = 105;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[1].notes; // FM 8 - Brains of Meek
                    const noteSet2 = result.tracks[9].notes; // Massive - Suspect
                    const noteSet3 = result.tracks[2].notes; // Combinator - Little Voices
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.scheduleCueSet(noteSet3, 'executeCueSet3');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        }

        p.pentagons = [];

        p.miniPentagons = [];

        p.miniPentagons2 = [];

        p.colourFills = [];

        p.colourStrokes = [];

        p.darkMode = false;

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB);
            p.angleMode(p.DEGREES);
            p.darkMode = Math.random() > 0.5;
            p.background(
                0, 
                0, 
                p.darkMode ? 0 : 100
            );
            p.stroke(0, 0, 100);
            const hue = p.random(0, 360);
            p.colourFills = TetradicColourCalculator(p, hue, 100, 100, 0.33);
            p.colourStrokes = TetradicColourCalculator(p, hue, 100, 100, 0.66);
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                p.background(
                    0, 
                    0, 
                    p.darkMode ? 0 : 100
                );
                for (let i = 0; i < p.miniPentagons.length; i++) {
                    const pentagon = p.miniPentagons[i];
                    const { x, y, size, fill, angle } = pentagon;
                    p.stroke(
                        0, 
                        0, 
                        p.darkMode ? 100 : 0
                    );
                    p.fill(fill);
                    p.strokeWeight(4);
                    p.beginShape();
                    for (let a = angle; a < angle + 360; a += (360 / 5)) {
                        let sx = x + p.cos(a) * size;
                        let sy = y + p.sin(a) * size;
                        p.vertex(sx, sy);
                    }
                    p.endShape(p.CLOSE);
                }
                for (let i = 0; i < p.pentagons.length; i++) {
                    const pentagon = p.pentagons[i];
                    pentagon.draw();
                    pentagon.update();
                }
                for (let i = 0; i < p.miniPentagons2.length; i++) {
                    const pentagon = p.miniPentagons2[i];
                    const { x, y, size, fill, angle } = pentagon;
                    p.stroke(
                        0, 
                        0, 
                        p.darkMode ? 0 : 100
                    );
                    p.fill(fill);
                    p.strokeWeight(2);
                    p.beginShape();
                    for (let a = angle; a < angle + 360; a += (360 / 5)) {
                        let sx = x + p.cos(a) * size;
                        let sy = y + p.sin(a) * size;
                        p.vertex(sx, sy);
                    }
                    p.endShape(p.CLOSE);
                }
            }
        }

        p.executeCueSet1 = ({currentCue}) => {
            if(currentCue % 8 === 1) {
                p.pentagons = [];
                if(currentCue > 1) {
                    p.darkMode = Math.random() > 0.5;
                }
                const hue = p.random(0, 360);
                p.colourFills = TetradicColourCalculator(p, hue, 100, 100, 0.33);
                p.colourStrokes = TetradicColourCalculator(p, hue, 100, 100, 0.66);
            }
            const x = p.random(p.width / 8, p.width - p.width / 8);
            const y = p.random(p.height / 8, p.height - p.height / 8);
            const fillIndex = p.random([0,1,2,3]);
            const strokeIndex = p.random([0,1,2,3].filter(num => num !== fillIndex))
            p.pentagons.push(
                new Pentagon(
                    p, 
                    x, 
                    y, 
                    p.colourFills[fillIndex],
                    p.colourStrokes[strokeIndex]
                )
            )
        }

        p.executeCueSet2 = ({currentCue}) => {
            if(currentCue > 10 && currentCue % 2) {
                if(currentCue % 16 === 1) {
                    p.miniPentagons = [];
                }
                const delay = 428.55;
                let x, y, size;

                do {
                    x = p.random(p.width / 8, p.width - p.width / 8);
                    y = p.random(p.height / 8, p.height - p.height / 8);
                    size = p.random(p.height / 64, p.width / 32);
                } while (p.checkForCollisions(x, y, size * 5));

                for (let index = 0; index < 5; index++) {
                    setTimeout(() => {
                        const fill = p.colourFills[p.random([0,1,2,3])];
                        const angle = p.random(0, 360);
                        p.miniPentagons.push(
                            {
                                x, 
                                y, 
                                size: size * (index + 1), 
                                fill,
                                angle
                            }
                        );
                    }, delay * index);
                }
            }
        }

        p.executeCueSet3 = ({currentCue, midi, ticks, ...note}) => {
            if(currentCue > 39 && currentCue % 3) {
                if(currentCue % 24 === 1) {
                    p.miniPentagons2 = [];
                }
                const delay = currentCue > 69 ? 125 : 66;
                const pentagonsPerSet = 25;
                const size = p.random(p.height / 32, p.width / 16);
                const x = p.map(
                    ticks % 491520,
                    0, 
                    491520, 
                    p.width / 32, 
                    p.width - p.width / 32
                );
                const y = p.map(
                    midi,
                    75,
                    61, 
                    p.height / 12, 
                    p.height - p.height / 12
                );
                let pentagonsToAdd = [];
                for (let index = 1; index < pentagonsPerSet; index++) {
                    const fill = p.colourFills[p.random([0,1,2,3])];
                    const angle = p.random(0, 360);
                    pentagonsToAdd.push(
                        {
                            x, 
                            y, 
                            size: size - ((size / pentagonsPerSet) * index), 
                            fill,
                            angle
                        }
                    );
                }
                pentagonsToAdd = p.shuffle(pentagonsToAdd);
                for (let index = 0; index < pentagonsToAdd.length; index++) {
                    setTimeout(() => {
                        p.miniPentagons2.push(
                            pentagonsToAdd[index]
                        );
                    }, delay * index);
                }
            }
        }

        p.checkForCollisions = (x, y, size) => {
            const buffer = size / 2; // Add some buffer space between sets
            for (let i = 0; i < p.miniPentagons.length; i += 5) {
                const existingSet = p.miniPentagons[i];
                const dx = existingSet.x - x;
                const dy = existingSet.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < existingSet.size * 5 + size + buffer) {
                    return true; // Collision detected
                }
            }
            return false; // No collision
        }

        p.hasStarted = false;

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                        if (typeof window.dataLayer !== typeof undefined){
                            window.dataLayer.push(
                                { 
                                    'event': 'play-animation',
                                    'animation': {
                                        'title': document.title,
                                        'location': window.location.href,
                                        'action': 'replaying'
                                    }
                                }
                            );
                        }
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                    if (typeof window.dataLayer !== typeof undefined && !p.hasStarted){
                        window.dataLayer.push(
                            { 
                                'event': 'play-animation',
                                'animation': {
                                    'title': document.title,
                                    'location': window.location.href,
                                    'action': 'start playing'
                                }
                            }
                        );
                        p.hasStarted = false
                    }
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
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
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
