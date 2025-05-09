"use strict";

let playState = false

const timekeeper = Tone.getTransport();

//Keyboard
const keyboard = new AudioKeys({
    rows: 1,
})

keyboard.down((key) => {
    console.log(key);
    console.log(Tone.Frequency(key.note, "midi").toNote());

    if(selectedInstrument != "X"){
        selectedInstrument.triggerAttack(key.frequency);
        if(currentTextField){
            currentTextField.dataset.noteVal = `${Tone.Frequency(key.note, "midi").toNote()}0${selectedInstrumentID}`;
            currentTextField.value = `${Tone.Frequency(key.note, "midi").toNote()} - ${inventory.names[selectedInstrumentID]}`;
        }
    }
})


//Current Active Stuff
let inventory = new Inventory;
let activeSequences = [];
let currentSelectedPattern = -1;

let tracks = [];
let playButton;

let patterns = [];

let patternSequence = [0,0,0,0,0,0,0,0];
let currentSequencePostion = 0;
let patternSequenceManager;

let heldInstrument;
let selectedInstrument;
let selectedInstrumentID;

let currentTextField;


window.onload = function () {
    Tone.Transport.bpm.value = 120;

    const inventoryButtons = document.querySelectorAll("#inventory-button");
    inventoryButtons.forEach((x) => {
        x.addEventListener("click",() => {
            const dataSlot = Number(x.dataset.slot);
            if (heldInstrument != null){
                inventory.addInstrument(heldInstrument[1], dataSlot, `${heldInstrument[0]}`);
                x.textContent = inventory.names[dataSlot];
                notify(`${heldInstrument[0]} placed in ${dataSlot} slot`);
                heldInstrument = null;
                
            }
            // Clear previously selected slot
            inventoryButtons.forEach(btn => btn.removeAttribute('data-selected'));
            // Mark this slot as selected
            x.setAttribute('data-selected', 'true');
            
            notify(`${inventory.names[dataSlot]} became current instrument`);
            selectedInstrumentID = dataSlot;
            selectedInstrument = inventory.list[dataSlot];
            updateNoteValues();
        });
        
        // Set up drop target events
        x.addEventListener('dragover', function(e) {
            e.preventDefault(); // Allow drop
        });

        x.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        x.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        x.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            // Get data from drag operation
            const instrumentName = e.dataTransfer.getData('text/instrument-name');
            const instrumentPath = e.dataTransfer.getData('text/instrument-path');
            const dataSlot = Number(this.dataset.slot);
            
            // Add instrument to inventory
            inventory.addInstrument(instrumentPath, dataSlot, instrumentName);
            this.textContent = inventory.names[dataSlot];
            updateNoteValues();
            notify(`${instrumentName} dropped into slot ${dataSlot}`);
        });
    });

    const browserButtons = document.querySelectorAll("#instrument");
    browserButtons.forEach((x) => {
        x.addEventListener("click", () => {
            heldInstrument =  [x.textContent, x.dataset.link];
            notify(`${x.textContent} selected`);
        });
        
        // Set up drag source events
        x.addEventListener('dragstart', function(e) {
            // Add dragging class for visual feedback
            this.classList.add('dragging');
            
            // Store instrument data for drop
            e.dataTransfer.setData('text/instrument-name', this.textContent);
            e.dataTransfer.setData('text/instrument-path', this.dataset.link);
        });
        
        x.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });


    createPattern();
    createTrack();

    //Play Button Logic
    playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function () {
        if (playState) {
            for (let i = 0; i < activeSequences.length; i++) {
                activeSequences[i].stop();
            }
            this.innerHTML = '<i class="fas fa-play"></i> Play';
            Tone.getTransport().stop();
            playState = false;
        }
        else {
            setActiveSequences();
            for (let i = 0; i < activeSequences.length; i++) {
                activeSequences[i].start();
            }
            this.innerHTML = '<i class="fas fa-stop"></i> Stop';
            playState = true;
            Tone.getTransport().start();
        }
    });

    //Add and Remove Pattern buttons
    const removePatternButton = document.querySelector("#remove-pattern-button");
    const addPatternButton = document.querySelector("#add-pattern-button");

    // removePatternButton.addEventListener()
    removePatternButton.addEventListener("click", removePattern);
    addPatternButton.addEventListener("click", createPattern);


    //BPM Field
    const bpmField = document.querySelector("#bpm-text-field");
    bpmField.value = String(Tone.Transport.bpm.value);
    bpmField.addEventListener("blur", function () {
        if (Number(bpmField.value)) {
            Tone.Transport.bpm.value = Number(bpmField.value);
            return;
        }
        else {
            bpmField.value = Tone.Transport.bpm.value;
        }
    })

    //Add and Track button connect events
    const addTrackButton = document.querySelector("#add-track-button");
    addTrackButton.addEventListener("click", createTrack);


    // Save and Load buttons
    const saveButton = document.getElementById("export-button");
    saveButton.addEventListener("click", saveProject);

    const loadButton = document.getElementById("import-button");
    loadButton.addEventListener("click", loadProject);

    document.addEventListener("click", () => {
        if (Tone.context.state != "running") {
            Tone.start();
        }
    });

    const patternSequencers = document.querySelectorAll("#sequence-field");
    patternSequencers.forEach((x) => {
        x.value = "0";
        x.addEventListener("blur", function(){
            stop();
            const inputedText = Number(this.value);
            console.log(inputedText)
            if (inputedText >= patterns.length || inputedText <= 0 || !inputedText){
                this.value = "0";
                notify("Please sequence an existing pattern");
            }
            for(let i = 0; i < patternSequencers.length; i++){
                patternSequence[i] = Number(patternSequencers[i].value);
            }
        })
    });

    const sequencePlay = document.querySelector("#play-button-sequence");
    sequencePlay.addEventListener("click",function() {
        if (playState) {
            for (let i = 0; i < activeSequences.length; i++) {
                activeSequences[i].stop();
            }
            patternSequenceManager.stop();
            currentSequencePostion = 0;
            this.innerHTML = 'Play';
            Tone.getTransport().stop();
            playState = false;
        }
        else {
            playState = true;
            setActiveSequences();
            this.innerHTML = 'Stop';
            activateSequence();
            Tone.getTransport().start();
        }
        console.log(patterns[currentSelectedPattern]);
    })

    

}

///
///
///

//Handles when note is supposed to be played. Just connects instrument and note information provided by sequencer.
function playNote(time, noteObj) {
    // get the actual note value
    const note = noteObj.value;
    
    // find the specific text field element being played
    const trackElement = tracks[noteObj.trackIndex];
    const textFields = trackElement.querySelectorAll("#track-text-field");
    const specificField = textFields[noteObj.stepIndex];
    
    // log both the note value and the specific DOM element
    console.log("Playing note:", note, "Element:", specificField);
    
    // add highlight class to the playing note
    specificField.classList.add("active-note");
    
    // remove the highlight after a delay
    setTimeout(() => {
        specificField.classList.remove("active-note");
    }, 300);
    
    if (note == "XXXX") {
        return;
    }

    let pitch = note[0] + note[1];
    let instrument = note[2] + note[3];

    let currentInstrument = inventory.list[Number(instrument)];
    if(currentInstrument != "X"){
        console.log(inventory);
        console.log(Number(instrument))
        console.log(currentInstrument);
        currentInstrument.triggerAttack(pitch, time);
    }
}



function setActiveSequences() {
    // stop();
    if (currentSelectedPattern == -1) {
        return;
    }
    

    dispose();
    setPatterns();
    
    for (let i = 0; i < tracks.length; i++) {
        console.log(`We looping ${i}`)
        let currentTrackSequence = [];
        const textFields = tracks[i].querySelectorAll("#track-text-field");

        for (let x = 0; x < textFields.length; x++) {
            // Store the note value and its position information
            currentTrackSequence.push({
                value: textFields[x].dataset.noteVal,
                trackIndex: i,
                stepIndex: x
            });
        }


        let newSequence = new Tone.Sequence(function (time, noteObj) {
            playNote(time, noteObj);
            //straight quater notes
        }, currentTrackSequence, `${currentTrackSequence.length}n`);

        activeSequences.push(newSequence);


        patterns[currentSelectedPattern][i] = (currentTrackSequence.map(noteObj => noteObj.value));
        console.log("current pattern" + patterns[currentSelectedPattern][i]);

        if (playState){
            newSequence.start(0.1);
        }
    }
    // checkValues("setActiveSequence");
}

function dispose(){
    for (let i = 0; i < activeSequences.length; i++) {
        activeSequences[i].dispose();
    };

    activeSequences = [];

}

function setPatterns(){
    
}

function stop() {
    if (playState) {
        if (patternSequenceManager){
            patternSequenceManager.dispose();
        }
        currentSequencePostion = 0;
        notify("Stopped");
        Tone.getTransport().stop();
        playState = false;
        playButton.innerHTML = '<i class="fas fa - play"></i> Play';
    }
}

function activateSequence(){
    patternSequenceManager = new Tone.Loop(function(time){

    if ( currentSelectedPattern != patternSequence[currentSequencePostion]){
        currentSelectedPattern = patternSequence[currentSequencePostion];
        loadPattern();
        dispose();
        rebuildTracksFromPatterns();
        setActiveSequences();
    }
    currentSequencePostion++;
    if (currentSequencePostion >= 8){
        currentSequencePostion = 0;
    }

        
    }, "1n").start(0);
    Tone.getTransport().start();
}

function checkValues(who) {
    console.log(who)
    console.log(patterns);
    console.log(patterns[currentSelectedPattern]);
}