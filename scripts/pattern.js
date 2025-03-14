class Pattern {
    constructor() {
        this.holder = [];
        this.length = this.holder.length;
    }

    editNote() {

    }

    addNote(string) {
        this.holder.push(string);
        this.length = this.holder.length

    }

    removeNote() {

    }

    //Checks if the note entered is valid
    //ATM set up without effects
    checkNote(note) {
        let currentNote = this.holder[note]

        if (currentNote.length > 2 || currentNote.length < 2) {
            return ["XX"];
        }
        else {
            return [currentNote];
        }
    }

    //Returns only the pitch of a not
    getPitch(note) {
        let currentNote = this.checkNote(note);
        if (currentNote[0] == "XX") {
            return false;
        } else {
            return currentNote[0];
        }
    }
}