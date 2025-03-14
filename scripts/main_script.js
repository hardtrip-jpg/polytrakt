"use strict";

//TEMP Script to test things out
let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})


let allTracks = [new Track];
let inventory = new Inventory();


// let track1 = new Tone.Loop((time) => {
//     playNote(time);
// }, currentTransportTime).start(0);
// let currentNote = 0;



window.onload = function () {
    let track1Pattern = allTracks[0].currentPattern;
    track1Pattern.addNote("G3");
    track1Pattern.addNote("G4");
    track1Pattern.addNote("G5");
    track1Pattern.addNote("G2");

    inventory.addInstrument("bass_boom.wav");
    const testButton = document.getElementById("test-button");

    testButton.addEventListener("click", playButton);
}

keyboard.down((key) => {
    console.log(key);
    currentSynth.triggerAttackRelease(key.frequency, "8n");
})



function playButton() {
    if (Tone.context.state != "running") {
        Tone.start();
    }

    if (playState) {
        Tone.getTransport().stop();
        playState = false;
    }
    else {
        playState = true;
        Tone.getTransport().start();
    }

}