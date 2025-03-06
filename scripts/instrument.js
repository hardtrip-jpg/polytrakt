class Instrument{

    constructor(sample){
        this.sampler = new Tone.Sampler({
            urls: {
                C3: sample
            },
            release: 1,
            baseUrl: "./samples",
        })
    }

    playSound(){

    }
}