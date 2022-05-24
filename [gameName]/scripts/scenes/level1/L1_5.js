class L1_5 extends levelScene {

    constructor() {
        super({
            key: 'L1_5',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    // debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_5' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
        console.log(this.denialSpawns[0]);
        if (this.musicScene.seenCinematic1_5) {
            this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 1]);
        }
        else {
            // this.musicScene.add.image(0,0,'blueFilter').setOrigin(0,0);
            // this.scene.bringToTop(this.musicScene);
        }

        var _denialTriggers = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers').objects.forEach(function (currTrigger) { _denialTriggers.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers = _denialTriggers;


        this.physics.add.overlap(this.player, this.denialTriggers, () => {
            this.denial.kill();
        })
    }

    step2() {
        
        this.player.setVelocityX(0);
        this.player.play('jumpDown');
        //this.musicScene.jukebox.currMusic.pause();
        //this.musicScene.jukebox = null;
        this.sound.add('denialEntranceSound').setVolume(0.3);
        this.sound.play('denialEntranceSound');
        this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 1]);
        this.denial.forceTick();
        this.add.image(0,0,'blueFilter').setOrigin(0,0).setScrollFactor(0);
        this.topStrip = this.add.image(0,64,'blackStrip').setOrigin(0).setScrollFactor(0);
        this.botStrip = this.add.image(0,880,'blackStrip').setOrigin(0).setScrollFactor(0);
        this.musicScene.jukebox.stop();
        console.log(this.musicScene.videoBG);
        this.musicScene.videoBG.setPaused();

        this.cameras.main.shake(1000, 0.002, false,this.step3);
        // this.time.addEvent({ delay: 1000, callbackscope: this, callback: this.step3 })
    }

    step3() {
        this.cameras.main.pan(this.denial.body.x, this.denial.body.y, 5000, 'Sine.easeInOut');
        this.time.addEvent({ delay: 5000, callbackScope: this, callback: this.step4 });
    }

    step4() {
        this.player.play('idle');
        this.musicScene.pauseMusic = this.musicScene.sound.add('pauseMinor');
        this.musicScene.jukebox._music = this.musicScene.jukebox._cursedHappy;
        this.musicScene.jukebox._currMusic = this.musicScene.jukebox._music[0];
        this.musicScene.jukebox.start();
        this.musicScene.videoBG.play();
        this.musicScene.videoBG.seekTo(0);
        this.topStrip.y = -64;
        this.botStrip.y = -64;
        this.musicScene.seenCinematic1_5 = true;
        this.musicScene.playingCinematic1_5 = false;

    }

    update(time, delta) {

        if (!this.musicScene.playingCinematic1_5) {
            this.player.move(this.cursors, this.keySpace, this.keyQ,this.keyD);
            this.player.animate(this.cursors);
        }

        if (this.keySpace.isDown && !this.musicScene.seenCinematic1_5 == true && !this.musicScene.playingCinematic1_5 == true) {
            this.musicScene.playingCinematic1_5 = true;
            this.step2();
        }

        if (this.musicScene.seenCinematic1_5) {
            // console.log('update')

            this.standardUpdate(time, delta);
            // this.denial.body.x = this.denial.x0;
            // this.denial.body.y = this.denial.y0;

            console.log(this.denial.y- this.denial.body.y);
            // console.log(this.denial.beam.y);
        }

        
    }

}