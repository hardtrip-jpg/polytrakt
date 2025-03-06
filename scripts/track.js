class Track {
    constructor(){
        this.holder = [new Pattern];
        this.currentPattern = this.patternList[0];
        this.currentNote = 0;
        this.effectChain = []
    }

    playNote(pitch, instrument, inventory){

        if (currentNote >= currentPattern.length){
            currentNote = 0;
        }

        if (pitch && instrument){
            let currentInstrument = inventory.matchInstrument()
            this.connectEffects(currentInstrument)
            currentInstrument.triggerAttackRelease(pitch, instrument,"8n", time);
            currentInstrument.disconnect();
        }

        this.currentNote++;
    }

    connectEffects(instrument){
        let previousEffect;
        for (let i = 0; i < this.effectChain.length; i++){
            if (!previousEffect){
                instrument.connect(this.effectChain[i])
                previousEffect = this.effectChain[i];
                return;
            }
            previousEffect.connect(this.effectChain[i]);
            previousEffect = this.effectChain[i];
        }
    }

    addEffect(effect){
        this.effectChain.push(effect);
    }
}