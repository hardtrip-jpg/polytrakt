"use strict";

//TEMP Script to test things out
let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})


let allTracks = [];
let inventory = new Inventory;


// let track1 = new Tone.Loop((time) => {
//     playNote(time);
// }, currentTransportTime).start(0);
// let currentNote = 0;



window.onload = function () {
    Tone.Transport.bpm.value = 150;

    inventory.addInstrument("samples/bass_boom.wav");

    allTracks[0] = new Track
    let track1Pattern = allTracks[0].currentPattern;
    track1Pattern.addNote("C1");
    track1Pattern.addNote("C2");
    track1Pattern.addNote("C3");
    track1Pattern.addNote("C4");
    allTracks[0].currentPlayingSequence.interval = track1Pattern.length;

    
    const testButton = document.getElementById("test-button");

    testButton.addEventListener("click", playButton);
    document.addEventListener("click", () => {
        if (Tone.context.state != "running") {
            Tone.start();
        }
    });
}

keyboard.down((key) => {
    console.log(key);
    currentSynth.triggerAttackRelease(key.frequency, "8n");
})



function playButton() {


    if (playState) {
        Tone.getTransport().stop();
        playState = false;
    }
    else {
        playState = true;
        Tone.getTransport().start();
    }

}