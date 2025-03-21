class Pattern {
    constructor() {
        this.holder = [];
    }
}

function createPattern() {
    setActiveSequences();
    patterns.push([]);

    currentSelectedPattern += 1;

    //Set Pattern to empty (4 "XXXX" for each track)
    for (let i = 0; i < tracks.length; i++) {
        patterns[currentSelectedPattern].push(["XXXX", "XXXX", "XXXX", "XXXX"]);
    }
    console.log(patterns);

    createPatternButton(currentSelectedPattern);

    loadPattern();
}

function removePattern(){
    if (patterns.length <= 1){
        return;
    };
    

    patterns.pop();
    let patternButtons = document.querySelectorAll("#pattern-button");
    patternButtons[patternButtons.length - 1].remove();
    currentSelectedPattern -= 1;
    loadPattern();
}

function loadPattern() {
    fixPatternTrackSize(currentSelectedPattern);

    for (let i = 0; i < tracks.length; i++) {
        let textFields = tracks[i].querySelectorAll("#track-text-field");
        //Check/Create Text Fields Appropriatly
        const currentLength = patterns[currentSelectedPattern][i].length;


        if (textFields.length > currentLength) {
            const difference = textFields.length - currentLength;
            let currentPos = textFields.length - 1;
            for (let x = 0; x < difference; x++) {
                currentPos -= 1;
                textFields[currentPos].remove();
            }

        } else if (textFields.length < currentLength) {
            const difference = currentLength - textFields.length;
            for (let x = 0; x < difference; x++) {
                const trackFields = tracks[i].querySelector(".track-fields")
                trackFields.appendChild(createTextInput(i + 1));
            }
        }

        //Edit Text fields
        console.log(patterns[currentSelectedPattern]);
        textFields = tracks[i].querySelectorAll("#track-text-field");
        for (let x = 0; x < textFields.length; x++) {

            textFields[x].value = patterns[currentSelectedPattern][i][x];
        }
    }

    setActiveSequences();
    console.log(`Set to Pattern ${currentSelectedPattern}`);
}

function fixPatternTrackSize(id) {
    //Fix Patterns to Track size
    if (patterns[id].length < tracks.length) {
        const difference = tracks.length - patterns[id].length
        for (let i = 0; i < difference; i++) {
            patterns[id].push(["XXXX", "XXXX", "XXXX", "XXXX"]);
        }
    } else if (patterns[id].length > tracks.length) {
        const difference = patterns[id].length - tracks.length
        for (let i = 0; i < difference; i++) {
            patterns[id].pop();
        }
    }
}

function createPatternButton(id) {
    //Add pattern button
    const patternHolder = document.querySelector("#patterns-holder");
    let newPattern = document.createElement("button");
    newPattern.id = "pattern-button";
    newPattern.dataset.pattern = `${id}`;
    newPattern.textContent = `${id}`
    newPattern.addEventListener("click", function () {
        setActiveSequences();
        currentSelectedPattern = this.dataset.pattern;
        loadPattern();
    });
    patternHolder.appendChild(newPattern);
}