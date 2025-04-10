function createTextInput(i) {
    let newField = document.createElement("input");
    newField.id = "track-text-field";
    newField.type = "text";
    newField.minLength = "4";
    newField.maxLength = "4";
    newField.dataset.track = `track-${i}`;
    newField.value = "XXXX";
    newField.addEventListener("focus", function () {
        stop();
        this.value = "";
        currentTextField = this;
        
        // Show keyboard helper 
        if (window.keyboardHelper) {
            window.keyboardHelper.show();
        }
    });
    newField.addEventListener("blur", function () {
        // Hide keyboard helper
        if (window.keyboardHelper) {
            window.keyboardHelper.hide();
        }
        checkInputedText.call(this);
    }
    );
    // setActiveSequences();
    return newField;
}

function checkInputedText() {
    if (this.value.length != 4) {
        this.value = "XXXX";
        notify("Invalid input");
        return;
    }
    currentTextField = null;
    
    // setActiveSequences();
}

//Creates a new track
function createTrack() {
    let main = document.querySelector("#track-holder");
    let newTrack = document.createElement("div");
    let trackNumber = tracks.length + 1;

    newTrack.id = `track-${trackNumber}`;
    newTrack.className = 'track';

    //Create remove track button
    let removeTrackButton = document.createElement("button");
    removeTrackButton.className = "count-button";
    removeTrackButton.id = "remove-track-button";
    removeTrackButton.innerHTML = `<i class="fas fa-minus"></i>`;
    removeTrackButton.addEventListener("click", function(){
        removeTrack(trackNumber - 1);
    })


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
    newRemove.addEventListener("click", function () {
        console.log("remove");
        let text_fields = fieldsDiv.querySelectorAll("#track-text-field");

        if (text_fields.length > 1) {
            text_fields[text_fields.length - 1].remove();

        };
        notify(`Removed Div on Track ${trackNumber}`);

        stop();
        setActiveSequences();
    });

    //New add div button
    newAdd.id = 'add-div';
    newAdd.dataset.track = newTrack.id;
    newAdd.textContent = "+";

    newAdd.addEventListener("click", function () {

        let newD = createTextInput(trackNumber);
        fieldsDiv.appendChild(newD);
        notify(`Added Div on Track ${trackNumber}`);

        stop();
        setActiveSequences();
    });

    // Add buttons to buttons container
    buttonsDiv.appendChild(newRemove);
    buttonsDiv.appendChild(newAdd);

    // Add text fields to fields container
    for (let i = 0; i < 4; i++) {
        let newText = createTextInput(trackNumber);
        fieldsDiv.appendChild(newText);
    }

    // Add containers to track
    newTrack.appendChild(removeTrackButton);
    newTrack.appendChild(fieldsDiv);
    newTrack.appendChild(buttonsDiv);

    main.appendChild(newTrack);
    tracks = document.querySelectorAll(".track");
    for(let i = 0; i < patterns.length; i++){
        let currentPattern = patterns[i];
        currentPattern.push(["XXXX","XXXX","XXXX","XXXX"]);
    }
}

function removeTrack(id) {
    if (tracks.length <= 1){
        notify("Must have at least one track");
        return;
    }

    setActiveSequences();

    for(let i = 0; i < patterns.length; i++){
        let currentPattern = patterns[i];
        currentPattern.splice(id, 1);
    }
    notify(`Removed Track ${id + 1}`);
    rebuildTracksFromPatterns();
}