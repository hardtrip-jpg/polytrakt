class Pattern {
    constructor() {
        this.holder = [];
    }
}

function createPattern() {
    patterns.push([]);
    console.log(patterns);
    currentSelectedPattern += 1;

    //Set Pattern to empty (4 "XXXX" for each track)
    for (let i = 0; i < tracks.length; i++) {
        patterns[currentSelectedPattern].push(["XXXX", "XXXX", "XXXX", "XXXX"]);
    }

    //Add pattern button
    const patternHolder = document.querySelector("#patterns-holder");
    let newPattern = document.createElement("button");
    newPattern.id = "pattern-button";
    newPattern.dataset.pattern = `${currentSelectedPattern}`;
    newPattern.textContent = `${currentSelectedPattern}`
    newPattern.addEventListener("click", function () {
        currentSelectedPattern = this.dataset.id;
        loadPattern();
    });

    loadPattern();

    patternHolder.appendChild(newPattern);
}

function loadPattern() {
    fixPatternTrackSize(currentSelectedPattern);

    for (let i = 0; i < tracks.length; i++) {
        let textFields = tracks[i].querySelectorAll("#track-text-fields");
        //Check/Create Text Fields Appropriatly
        const currentLength = patterns[currentSelectedPattern][i].length;
        if (textFields.length > currentLength) {
            const difference = textFields.length - currentLength;
            for (let x = 0; x < difference; x++) {
                const currentPos = textFields.length - 1;
                textFields[currentPos].remove();
                textFields.pop();
            }

        } else if (textFields.length < currentLength) {
            const difference = currentLength - textFields.length;
            for (let x = 0; x < difference; x++) {
                createTextInput(i);
            }
        }

        //Edit Text fields

        for (let x = 0; x < textFields.length; i++) {
            textFields[x].value = patterns[currentSelectedPattern][i][x];
        }
    }

    setActiveSequences();
    console.log(`Set to Pattern ${currentSelectedPattern}`);
}

function fixPatternTrackSize(id) {
    console.log(this)
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