"use strict";

// Save project to JSON file
function saveProject() {
    // Stop playback if it's running
    if (typeof stop === 'function') {
        stop();
    }

    // Gather all project data
    const projectData = {
        bpm: Tone.Transport.bpm.value,
        currentPattern: currentSelectedPattern,
        patterns: patterns,
        patternSequence: patternSequence,
        inventoryNames: inventory.names,
        inventorySamples: inventory.samples,
    };

    console.log(projectData);

    // Convert to JSON string
    const jsonData = JSON.stringify(projectData, null, 2);

    // Create a blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create temporary download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'polytrakt_project.json';

    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

// Load project from JSON file
function loadProject() {
    // Create file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                // Parse the JSON data
                const projectData = JSON.parse(e.target.result);

                // Update application state
                loadProjectData(projectData);
            } catch (error) {
                console.error('Error loading project:', error);
            }
        };
        reader.readAsText(file);
    });

    // Trigger file selection
    fileInput.click();
}

// Update application with loaded project data
function loadProjectData(data) {
    // Stop playback if running
    if (typeof stop === 'function') {
        stop();
    }

    // Update patterns
    patterns = data.patterns || [];

    // Update BPM
    if (data.bpm) {
        Tone.Transport.bpm.value = data.bpm;
        const bpmField = document.querySelector("#bpm-text-field");
        bpmField.value = String(data.bpm);
    }

    // Set current pattern
    currentSelectedPattern = data.currentPattern || 0;

    // Set current pattern sequence
    patternSequence = data.patternSequence || [];

    // Update UI to reflect loaded data
    rebuildInventory(data);
    rebuildSequence();
    rebuildPatterns();
    rebuildTracksFromPatterns();
}

function rebuildInventory(data){
    if (!data.inventorySamples){
        return;
    }
    //Reset current inventory
    inventory = new Inventory;
    const inventoryButtons = document.querySelectorAll("#inventory-button");
    console.log(inventoryButtons)

    for(let i = 0; i < data.inventorySamples.length; i++){
        inventoryButtons[i].textContent = inventoryButtons[i].dataset.slot;
        if (data.inventorySamples[i] != "X"){
            inventory.addInstrument(data.inventorySamples[i],i,data.inventoryNames[i]);
            inventoryButtons[i].textContent = data.inventoryNames[i];
        }
    }

}

function rebuildSequence(){

}



//Rebuild the UI patterns based on loaded data
function rebuildPatterns() {
    const matchView = document.querySelector("#main-view");
    const existingPatterns = document.querySelectorAll("#pattern-button")
    existingPatterns.forEach(button => button.remove());

    for (let i = 0; i < patterns.length; i++) {
        createPatternButton(i);
    }

}

// Rebuild the UI tracks based on loaded pattern data
function rebuildTracksFromPatterns() {
    // Remove all existing tracks
    const mainView = document.querySelector("#main-view");
    const existingTracks = mainView.querySelectorAll(".track");
    existingTracks.forEach(track => track.remove());

    // Reset tracks array
    tracks = [];

    // If there's no pattern data for the current pattern, create a default track
    if (!patterns[currentSelectedPattern] || patterns[currentSelectedPattern].length === 0) {
        createTrack();
        return;
    }

    // Create tracks based on pattern data
    console.log("mama");
    console.log(patterns[currentSelectedPattern]);
    patterns[currentSelectedPattern].forEach(trackSequence => {
        const trackIndex = tracks.length;
        console.log("pee")
        createTrack();

        // Get the track we just created
        const track = document.querySelectorAll(".track")[trackIndex];
        const fieldsDiv = track.querySelector(".track-fields");

        // Remove default text fields
        const defaultFields = fieldsDiv.querySelectorAll("#track-text-field");
        defaultFields.forEach(field => field.remove());

        // Add text fields based on pattern data
        trackSequence.forEach(noteValue => {
            const textField = createTextInput(trackIndex + 1);
            textField.value = noteValue;
            fieldsDiv.appendChild(textField);
        });
    });

    loadPattern();
    // Update sequences
    setActiveSequences();
}
