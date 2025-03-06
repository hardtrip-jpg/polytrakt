class Inventory {
    constructor(){
        this.list = []
    }

    addInstrument(instrument, id){
        this.list.push(instrument)
    }

    matchInstrument(id){
        return this.list[id];
    }

}