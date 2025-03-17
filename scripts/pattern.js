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

    for (let i = 0; i < tracks.length; i++) {
        const textFields = tracks[i].querySelectorAll("#track-text-fields");
        //Check/Create Text Fields Appropriatly
        const currentLength = patterns[currentSelectedPattern][i].length;

        //Edit Text fields

        for (let x = 0; x < textFields.length; i++) {
            textFields[x].value
        }
    }

    setActiveSequences();
    console.log(`Set to Pattern ${id}`);
}