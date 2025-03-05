"use strict";
//TEMP Script to test things out
let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})


//Instruments
const synth1 = new Tone.Synth({
    oscillator: {
        type: "sine",
    },
}).toDestination();
const synth2 = new Tone.Synth({
    oscillator: {
        type: "square",
    },
}).toDestination();

const instrumentList = [
    synth1,
    synth2
];

const patternList = [
    ["C5", "B5", "C5"],
    ["D3","D4","D5","D4","D3","D4","D5"],
];

let currentSynth = instrumentList[0];

let currentBPM = 140.0;

let currentPattern = patternList[0];

let currentTransportTime = updateTransportTime();

let track1 = new Tone.Loop((time) => {
    playNote(time);
}, currentTransportTime).start(0);
let currentNote = 0;
//User Activated input
window.onload = function() {
    
    changePattern(0);
    const testButton = document.getElementById("test-button");

    testButton.addEventListener("click", playButton); 
}

keyboard.down((key) => {
    console.log(key);
    currentSynth.triggerAttackRelease(key.frequency, "8n");
})


function updateTransportTime(){
    return `${currentPattern.length}n`;
}

function playButton(){
    if (Tone.context.state != "running"){
        Tone.start();
    }

    if (playState){
        Tone.getTransport().stop();
        playState = false;
    }
    else{
        console.log(track1)
        playState = true;
        Tone.getTransport().start();
    }
   // currentSynth.triggerAttackRelease("C4", "8n");

}

function playNote(time){
    console.log("1")
    if (currentNote >= currentPattern.length){
        currentNote = 0;
    }
    currentSynth.triggerAttackRelease(currentPattern[currentNote],"8n", time);
    currentNote++;
}


//Function called by HTML
function changeInstrument(id){
    currentSynth = instrumentList[id];
}

function changePattern(id){
    currentPattern = patternList[id];
    currentTransportTime = updateTransportTime();
    currentNote = 0;
    track1.interval = currentTransportTime;
    console.log(currentTransportTime)
}