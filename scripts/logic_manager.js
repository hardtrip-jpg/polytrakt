"use strict";
let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})


//Current Active Stuff
let allTracks = [new Track];
let inventory = new Inventory;
let activeSequences = [];
let currentSelectedPattern = 0;

let tracks

// let track1 = new Tone.Loop((time) => {
//     playNote(time);
// }, currentTransportTime).start(0);
// let currentNote = 0;



window.onload = function () {
    Tone.Transport.bpm.value = 150;

    inventory.addInstrument("samples/bass_boom.wav");

    //Play Button Logic
    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function(){
        if (playState) {
            this.textContent = "Play"
            Tone.getTransport().stop();
            playState = false;
        }
        else {
            this.textContent = "Stop"
            playState = true;
            Tone.getTransport().start();
        }
    });

    //Pattern Button Logic
    const currentPatternButtons = document.querySelectorAll("#pattern-button");
    for (let i = 0; i < currentPatternButtons.length; i++){
        currentPatternButtons[i].addEventListener("click", function(){
            if(currentSelectedPattern != currentPatternButtons[i].dataset.pattern){
                currentSelectedPattern = currentPatternButtons[i].dataset.pattern;
                console.log(currentSelectedPattern);
            }
        })
    }

    //Track Logic
    tracks = document.querySelectorAll(".track");
    for (let i = 0; i < tracks.length; i++){
        const remove_div = tracks[i].querySelector("#remove-div");
        const add_div = tracks[i].querySelector("#add-div");
        let text_fields = tracks[i].querySelectorAll("#track-text-field");

        remove_div.addEventListener("click", function(){
            console.log("remove");
            if (text_fields.length > 1){
            text_fields[text_fields.length - 1].remove();
            text_fields = tracks[i].querySelectorAll("#track-text-field");
            }
            Tone.getTransport().stop();
            playState = false;
        });

        add_div.addEventListener("click", function(){
            console.log("add");
            let newD = createTextInput(i);
            tracks[i].appendChild(newD);
            text_fields = tracks[i].querySelectorAll("#track-text-field");
            Tone.getTransport().stop();
            playState = false;
        })
    }


    document.addEventListener("click", () => {
        if (Tone.context.state != "running") {
            Tone.start();
        }
    });
}

keyboard.down((key) => {
    console.log(key);
    inventory[0].triggerAttackRelease(key.frequency, "8n");
})


//Handles when note is supposed to be played. Just connects instrument and note information provided by sequencer.
function playNote(time, note) {
    let currentInstrument = inventory.matchInstrument("00");
    currentInstrument.triggerAttack(note, time);
}



function createTextInput(i){
    console.log("huh")
    let newField = document.createElement("input");
    newField.id = "track-text-field";
    newField.type = "text";
    newField.minLength = "4";
    newField.maxLength = "4";
    newField.dataset.track = `track-${i}`
    return newField
}