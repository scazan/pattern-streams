// @ts-nocheck
import IntervalWorker from './clock-worker?worker';

export default class Clock {
  public onTick = (beatNumber: number, time: number) => {};
  private audioContext: AudioContext;
  private unlocked = false;
  public isPlaying = false;      // Are we currently playing?
  public current16thNote: number = 0;        // What note is currently last scheduled?
  public tempo = 120.0;          // tempo (in beats per minute)
  private lookAhead = 25.0;       // How frequently to call scheduling function 
  scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
  nextNoteTime = 0.0;     // when the next note is due.
  noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
  noteLength = 0.05;      // length of "beep" (in seconds)
  last16thNoteDrawn = -1; // the last "box" we drew on the screen
  notesInQueue: Array<any> = [];      // the notes that have been put into the web audio,

  // and may or may not have played yet. {note, time}
  timerWorker: Worker;     // The Web Worker used to fire timer messages

  constructor(context: AudioContext, onTick: (beatNumber: number, time: number) => any) {
    this.audioContext = context;
    this.onTick = onTick;

    this.timerWorker = new IntervalWorker();

    this.timerWorker.onmessage = (e) => {
      if (e.data == "tick") {
        this.scheduler();
      }
      else
        console.log("message: " + e.data);
    };

    this.timerWorker.postMessage({ 'interval': this.lookAhead });
  }

  private nextNote() {
    // Advance current note and time by a 16th note...
    const secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.current16thNote++;    // Advance the beat number, wrap to zero

    if (this.current16thNote === 16) {
      this.current16thNote = 0;
    }
  }

  private scheduleNote( beatNumber: number, time: number ) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push({ note: beatNumber, time } );

    if ( (this.noteResolution==1) && (beatNumber%2)) {
      return; // we're not playing non-8th 16th notes
    }

    if ( (this.noteResolution==2) && (beatNumber%4)) {
      return; // we're not playing non-quarter 8th notes
    }

    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect( this.audioContext.destination );

    if (beatNumber % 16 === 0) {    // beat 0 == high pitch
      osc.frequency.value = 880.0;
    }
    else if (beatNumber % 4 === 0 ) {    // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    }
    else {                        // other 16th notes = low pitch
      osc.frequency.value = 220.0;
    }

    osc.start( time );
    osc.stop( time + this.noteLength );
  }

  private scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
      // this.scheduleNote( this.current16thNote, this.nextNoteTime );
      this.onTick( this.current16thNote, this.nextNoteTime );
      this.nextNote();
    }
  }

  public play() {
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
  }
}

