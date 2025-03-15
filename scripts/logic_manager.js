"use strict";
let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})


//Current Active Stuff
let inventory = new Inventory;
let activeSequences = [];
let currentSelectedPattern = 0;

let tracks



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

    initializeTracks();

    let addTrackButton = document.querySelector("#add-track-button");
    addTrackButton.addEventListener("click", createTrack);

    document.addEventListener("click", () => {
        if (Tone.context.state != "running") {
            Tone.start();
        }
    });


}

///
///
///

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
    let newField = document.createElement("input");
    newField.id = "track-text-field";
    newField.type = "text";
    newField.minLength = "4";
    newField.maxLength = "4";
    newField.dataset.track = `track-${i}`;
    return newField
}

//Creates a new track
function createTrack(){
    let main = document.querySelector("#main-view");
    let newTrack = document.createElement("div");
    let trackNumber = tracks.length + 1;
    
    newTrack.id = `track-${trackNumber}`;
    newTrack.className = 'track';
    
    // Create track buttons container
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "track-buttons";
    
    // Create track fields container
    let fieldsDiv = document.createElement("div");
    fieldsDiv.className = "track-fields";
    
    // Create buttons
    let newRemove = document.createElement("button");
    let newAdd = document.createElement("button");

    newRemove.id = 'remove-div';
    newRemove.dataset.track = newTrack.id;
    newRemove.textContent = "-";

    newRemove.addEventListener("click", function(){
        console.log("remove");
        let text_fields = fieldsDiv.querySelectorAll("#track-text-field");

        if (text_fields.length > 1){
            text_fields[text_fields.length - 1].remove();
        }

        Tone.getTransport().stop();
        playState = false;
    });

    newAdd.id = 'add-div';
    newAdd.dataset.track = newTrack.id;
    newAdd.textContent = "+";

    newAdd.addEventListener("click", function(){
        console.log("add")
        let newD = createTextInput(trackNumber);
        fieldsDiv.appendChild(newD);

        Tone.getTransport().stop();
        playState = false;
    });

    // Add buttons to buttons container
    buttonsDiv.appendChild(newRemove);
    buttonsDiv.appendChild(newAdd);
    
    // Add text fields to fields container
    for (let i = 0; i < 4; i++){
        let newText = createTextInput(trackNumber);
        fieldsDiv.appendChild(newText);
    }

    // Add containers to track
    newTrack.appendChild(buttonsDiv);
    newTrack.appendChild(fieldsDiv);

    main.appendChild(newTrack);
    tracks = document.querySelectorAll(".track");
}

function setActiveSequences(){

}



//Initalizes current html
function initializeTracks(){
    tracks = document.querySelectorAll(".track");
    console.log(tracks);
    
    for (let i = 0; i < tracks.length; i++){
        let trackId = tracks[i].id;
        let buttonsDiv = tracks[i].querySelector(".track-buttons");
        let fieldsDiv = tracks[i].querySelector(".track-fields");
        
        let remove_div = buttonsDiv.querySelector("#remove-div");
        let add_div = buttonsDiv.querySelector("#add-div");
        
        remove_div.addEventListener("click", function(){
            console.log("remove");
            let text_fields = fieldsDiv.querySelectorAll("#track-text-field");
            
            if (text_fields.length > 1){
                text_fields[text_fields.length - 1].remove();
            }
            
            Tone.getTransport().stop();
            playState = false;
        });

        add_div.addEventListener("click", function(){
            console.log("add");
            let newD = createTextInput(i);
            fieldsDiv.appendChild(newD);

            Tone.getTransport().stop();
            playState = false;
        });
    }
}