class Pattern {
    constructor() {
        this.holder = [];
    }

    addNote(string, pos) {
        this.holder.push(this.checkNote(string));
        this.length = this.holder.length
    }

    removeNote() {
        this.holder.pop();
    }
}

