export default class Clock {
    onTick: (beatNumber: number, time: number) => void;
    private audioContext;
    private unlocked;
    isPlaying: boolean;
    current16thNote: number;
    tempo: number;
    private lookAhead;
    scheduleAheadTime: number;
    nextNoteTime: number;
    noteResolution: number;
    noteLength: number;
    last16thNoteDrawn: number;
    notesInQueue: Array<any>;
    timerWorker: Worker;
    constructor(context: AudioContext, onTick: (beatNumber: number, time: number) => any);
    private nextNote;
    private scheduleNote;
    private scheduler;
    play(): "play" | "stop";
}
