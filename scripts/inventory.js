class Inventory {
    constructor(){
        this.list = ["X","X","X","X","X","X","X","X"];

        //This is primarily use for saving and loading
        this.names = ["X","X","X","X","X","X","X","X"];
        this.samples = ["X","X","X","X","X","X","X","X"];
    }

    addInstrument(instrument, id, text){
        let new_instrument = new Tone.Sampler({
            urls: {
                C3: instrument,
            },
            }).toDestination();
        this.list[id]= new_instrument;
        this.names[id] = text;
        this.samples[id] = instrument;
    }
}

