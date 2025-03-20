class Inventory {
    constructor(){
        this.list = []
    }

    addInstrument(instrument, id){
        let new_instrument = new Tone.Sampler({
            urls: {
                C3: instrument,
            },
            }).toDestination();
        this.list.push(new_instrument);
    }

    matchInstrument(id){
        let check = Number(id)
        return this.list[check];
    }

}