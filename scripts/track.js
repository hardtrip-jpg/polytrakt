class Track {
    constructor() {
        this.patternList = [new Pattern];
        this.currentPattern = this.patternList[0];
        this.currentNote = 0;
        // this.effectChain = [];
        this.currentDivision = this.currentPattern.length
        this.currentPlayingSequence = new Tone.Loop((time) => {
            this.playNote("00", time);
        }, `1:${this.currentDivision}`).start(0);
    }

    playNote(instrument, time) {
        console.log(this.currentPlayingSequence.interval);

        if (this.currentNote >= this.currentPattern.length) {
            this.currentNote = 0;
        }

        let pitch = this.currentPattern.getPitch(this.currentNote)

        if (pitch && instrument) {
            let currentInstrument = inventory.matchInstrument("00");
            // this.connectEffects(currentInstrument)
            currentInstrument.releaseAll();
            currentInstrument.triggerAttack(pitch, time);
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