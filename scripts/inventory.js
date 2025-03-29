class Inventory {
    constructor(){
        this.list = ["X","X","X","X","X","X","X","X"]
    }

    addInstrument(instrument, id){
        let new_instrument = new Tone.Sampler({
            urls: {
                C3: instrument,
            },
            }).toDestination();
        this.list[id]= new_instrument;
    }
}

