class JukeBox2 {

    constructor(musicScene = null, levelScene = null) {
        this.musicScene = musicScene;
        this.levelScene = levelScene;
        this.timer;
        this.oneSec;
        this.globalTime = 0;
        //this.music = this.scene.sound.add('angry100bpm') ;

        this.on = false;
        this.beatCount = 1;

        this._sequence = [0, 1, 2, 1, 2, 3, 4, 3, 4, 5];
        this.sequenceIndex = 0;

        // Construction des objets musicaux du niveau
        this.happy = this.musicScene.sound.add('happy')
        const NHAPPYLENGHT = 40 * 4;
        const BEATLENGHT115 = (1000 * 60) / 115;

        for (let i = 0 ; i < NHAPPYLENGHT ; i++) {
            this.happy.addMarker('mk'+i,BEATLENGHT115*i,BEATLENGHT115);
        }

        this._cursedHappy = new Array();
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH1'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH2'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH3'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH4'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH5'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH6'));

        this._music = this._happy;

        


        this.currMusic = this.happy;
        this.currMusicBeatCount = 1;
    }

    setMusicScene(musicScene) {
        this.musicScene = musicScene;
    }

    setLevelScene(levelScene) {
        this.levelScene = levelScene;
    }

    tick(internal) {
        // console.log(this.currMusic.key);
        // console.log(this.beatCount)
        for (let i = 0; i < 4; i++) {
            this.levelScene.p4[i].tick3(this.beatCount);
        }

        for (let i = 0; i < 4; i++) {
            this.levelScene.db4[i].tick3(this.beatCount);
        }

        for (let i = 0; i < 8; i++) {
            this.levelScene.p8[i].tick3(this.beatCount);
        }

        for (let i = 0; i < 8; i++) {
            this.levelScene.db8[i].tick3(this.beatCount);
        }

        this.levelScene.p4overlap.forEach(layer => {
            layer.forEach(rythmPlat => {
                rythmPlat.tick3(this.beatCount);
            })
        })

        this.levelScene.db4overlap.forEach(layer => {
            layer.forEach(rythmPlat => {
                rythmPlat.tick3(this.beatCount);
            })
        })

        this.levelScene.p8overlap.forEach(layer => {
            layer.forEach(rythmPlat => {
                rythmPlat.tick3(this.beatCount);
            })
        })

        this.levelScene.db8overlap.forEach(layer => {
            layer.forEach(rythmPlat => {
                rythmPlat.tick3(this.beatCount);
            })
        })

        if (internal) {
            this.sequenceIndex += 1;
            this.currMusic.setSeek(60/115*(this.beatCount%(40*4)));
        }

        try { this.levelScene.denial.denialTick(this.beatCount); }
        catch (error) { /*console.log(error);*/}
    }

    start(key) {
        if (this.on == false && this.levelScene != null) {
            this.on = true;
            //console.log(this._music[0]) ;

            this.currMusic.play();

            //préparation de l'igt
            this.oneSec = this.musicScene.time.addEvent({
                delay: 1000, loop: true, callbackScope: this, callback: function () {
                    this.globalTime += 1;
                }
            });

            // Main timer
            this.timer = this.musicScene.time.addEvent({
                delay: (1000 * 60) / 115, loop: true, callbackScope: this, callback: function() {
                    this.tick(true);
                    this.beatCount += 1;
                    this.currMusicBeatCount += 1;
                }
            });
        }
    }

    stop() {
        this.currMusic.stop();

        this.beatCount = 1;
        this.currMusicBeatCount = 1;
        this.sequenceIndex = 0;
        this.currMusic = this._music[0];
        this.on = false;
        
        this.timer.remove();
    }
}   