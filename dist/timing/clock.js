"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var clock_worker_worker_1 = __importDefault(require("./clock-worker?worker"));
var Clock = /** @class */ (function () {
    function Clock(context, onTick) {
        var _this = this;
        this.onTick = function (beatNumber, time) { };
        this.unlocked = false;
        this.isPlaying = false; // Are we currently playing?
        this.current16thNote = 0; // What note is currently last scheduled?
        this.tempo = 120.0; // tempo (in beats per minute)
        this.lookAhead = 25.0; // How frequently to call scheduling function 
        this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0; // when the next note is due.
        this.noteResolution = 0; // 0 == 16th, 1 == 8th, 2 == quarter note
        this.noteLength = 0.05; // length of "beep" (in seconds)
        this.last16thNoteDrawn = -1; // the last "box" we drew on the screen
        this.notesInQueue = []; // the notes that have been put into the web audio,
        this.audioContext = context;
        this.onTick = onTick;
        this.timerWorker = new clock_worker_worker_1.default();
        this.timerWorker.onmessage = function (e) {
            if (e.data == "tick") {
                _this.scheduler();
            }
            else
                console.log("message: " + e.data);
        };
        this.timerWorker.postMessage({ 'interval': this.lookAhead });
    }
    Clock.prototype.nextNote = function () {
        // Advance current note and time by a 16th note...
        var secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
        this.nextNoteTime += 0.25 * secondsPerBeat; // Add beat length to last beat time
        this.current16thNote++; // Advance the beat number, wrap to zero
        if (this.current16thNote === 16) {
            this.current16thNote = 0;
        }
    };
    Clock.prototype.scheduleNote = function (beatNumber, time) {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time });
        if ((this.noteResolution == 1) && (beatNumber % 2)) {
            return; // we're not playing non-8th 16th notes
        }
        if ((this.noteResolution == 2) && (beatNumber % 4)) {
            return; // we're not playing non-quarter 8th notes
        }
        // create an oscillator
        var osc = this.audioContext.createOscillator();
        osc.connect(this.audioContext.destination);
        if (beatNumber % 16 === 0) { // beat 0 == high pitch
            osc.frequency.value = 880.0;
        }
        else if (beatNumber % 4 === 0) { // quarter notes = medium pitch
            osc.frequency.value = 440.0;
        }
        else { // other 16th notes = low pitch
            osc.frequency.value = 220.0;
        }
        osc.start(time);
        osc.stop(time + this.noteLength);
    };
    Clock.prototype.scheduler = function () {
        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            // this.scheduleNote( this.current16thNote, this.nextNoteTime );
            this.onTick(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    };
    Clock.prototype.play = function () {
        if (!this.unlocked) {
            // play silent buffer to unlock the audio
            var buffer = this.audioContext.createBuffer(1, 1, 22050);
            var node = this.audioContext.createBufferSource();
            node.buffer = buffer;
            node.start(0);
            this.unlocked = true;
        }
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) { // start playing
            this.current16thNote = 0;
            this.nextNoteTime = this.audioContext.currentTime;
            this.timerWorker.postMessage('start');
            return 'stop';
        }
        else {
            this.timerWorker.postMessage("stop");
            return 'play';
        }
    };
    return Clock;
}());
exports.default = Clock;
