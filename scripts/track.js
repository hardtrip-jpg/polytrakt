class Track {
    constructor() {
        this.patternList = [new Pattern];
        this.currentPattern = this.patternList[0];
        this.currentNote = 0;
        // this.effectChain = [];
        this.currentDivision = this.currentPattern.length
        this.currentlyPlayingSequence = new Tone.Loop((time) => {
            playNote(this.curren, time);
        }, this.currentDivision).start(0);
    }

    playNote(instrument, inventory, time) {

        if (currentNote >= currentPattern.length) {
            currentNote = 0;
        }

        let pitch = this.currentPattern.getPitch(this.currentNote)

        if (pitch && instrument) {
            let currentInstrument = inventory.matchInstrument()
            // this.connectEffects(currentInstrument)
            currentInstrument.triggerAttackRelease(pitch, instrument, "8n", time);
            // currentInstrument.disconnect();
        }

        this.currentNote++;
    }

    // connectEffects(instrument) {
    //     let previousEffect;
    //     for (let i = 0; i < this.effectChain.length; i++) {
    //         if (!previousEffect) {
    //             instrument.connect(this.effectChain[i])
    //             previousEffect = this.effectChain[i];
    //             return;
    //         }
    //         previousEffect.connect(this.effectChain[i]);
    //         previousEffect = this.effectChain[i];
    //     }
    // }

    // addEffect(effect) {
    //     this.effectChain.push(effect);
    // }

    playTiming(time) {

    }
}