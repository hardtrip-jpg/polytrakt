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

let tracks = [];
let playButton


window.onload = function () {
    Tone.Transport.bpm.value = 150;

    inventory.addInstrument("samples/bass_boom.wav");

    createTrack();

    //Play Button Logic
    playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function(){
        if (playState) {
            for (let i = 0; i < activeSequences.length; i++){
                activeSequences[i].stop();
            }
            this.textContent = "Play"
            Tone.getTransport().stop();
            playState = false;
        }
        else {
            setActiveSequences();
            for (let i = 0; i < activeSequences.length; i++){
                activeSequences[i].start();
            }
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

    //Add and Remove Track buttons connect events
    let addTrackButton = document.querySelector("#add-track-button");
    addTrackButton.addEventListener("click", createTrack);

    let removeTrackButton = document.querySelector("#remove-track-button");
    removeTrackButton.addEventListener("click", removeTrack);

    document.addEventListener("click", () => {
        if (Tone.context.state != "running") {
            Tone.start();
        }
    });




}

///
///
///



//Handles when note is supposed to be played. Just connects instrument and note information provided by sequencer.
function playNote(time, note) {
    console.log(note);
    // let currentInstrument = inventory.matchInstrument("00");
    // currentInstrument.triggerAttack(note, time);
}



function createTextInput(i){
    let newField = document.createElement("input");
    newField.id = "track-text-field";
    newField.type = "text";
    newField.minLength = "4";
    newField.maxLength = "4";
    newField.dataset.track = `track-${i}`;
    newField.value = "XXXX";
    newField.addEventListener("click", stop);
    newField.addEventListener("blur", checkInputedText)
    return newField;
}

function checkInputedText(){
    console.log(this.value)
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

    //New remove div button
    newRemove.addEventListener("click", function(){
        console.log("remove");
        let text_fields = fieldsDiv.querySelectorAll("#track-text-field");

        if (text_fields.length > 1){
            text_fields[text_fields.length - 1].remove();
        }

        stop();
    });


    //New add div button
    newAdd.id = 'add-div';
    newAdd.dataset.track = newTrack.id;
    newAdd.textContent = "+";

    newAdd.addEventListener("click", function(){
        console.log("add");

        let newD = createTextInput(trackNumber);
        fieldsDiv.appendChild(newD);

        stop();
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

function removeTrack(){
    stop();
    if (tracks.length > 0){
        tracks[tracks.length - 1].remove();
        tracks = document.querySelectorAll(".track");
    }
}

function setActiveSequences(){
    for (let i = 0; i < activeSequences.length; i++){
        // activeSequences[i].dispose();
    };

    activeSequences = [];

    for (let i = 0; i < tracks.length; i++){
        let currentTrackSequence = [];
        let textFields = tracks[i].querySelectorAll("#track-text-field");
        for (let x = 0; x < textFields.length; x++){
            currentTrackSequence.push(textFields[x].value);
        }
        let newSequence = new Tone.Sequence(function(time, note){
            playNote(time, note);
        //straight quater notes
        }, currentTrackSequence, `${currentTrackSequence.length}n`);
        activeSequences.push(newSequence);
    }
    console.log(activeSequences);
}

function stop(){
    console.log("Stopped");
    Tone.getTransport().stop();
    playState = false;
    playButton.textContent = "Play";
}



