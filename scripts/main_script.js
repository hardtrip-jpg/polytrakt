"use strict";
//TEMP Script to test things out


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
]

let currentSynth = synth1



//User Activated input
window.onload = function() {
    const testButton = document.getElementById("test-button");

    testButton.addEventListener("click", () => {
        if(Tone.context.state != "running"){
           Tone.start();
       }
       currentSynth.triggerAttackRelease("C4", "8n");
    });    
}

keyboard.down((key) => {
    console.log(key);
    currentSynth.triggerAttackRelease(key.frequency, "8n");
})





//Function called by HTML
function changeInstrument(id){
    currentSynth = instrumentList[id];
}
