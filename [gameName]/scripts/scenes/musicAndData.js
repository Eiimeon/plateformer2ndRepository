class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })
        this.seenCinematic1_5 = false ;
        this.playingCinematic1_5 = false ;

        this.seenCinematic1_8 = false ;

    }

    preload() { }

    create() {
        
        this.scene.run('L1_'+LEVELORDER[STARTLEVELINDEX],this);
        this.levelScene = this.scene.get('L1_'+LEVELORDER[STARTLEVELINDEX]);

        this.jukebox = new JukeBox(this,this.levelScene);
        this.jukebox.start();

        this.pauseMusic = this.sound.add('pauseMajor').setVolume(0.2).setLoop(true);


        // this.add.image(0,600,'rose').setOrigin(0,0).setScrollFactor(0);
        this.videoBG = this.add.video(-2*64 - 32,-4*64,'audioVizHappy').setOrigin(0,0).setScrollFactor(0).setScale(1.3);
        this.videoBG.setLoop(true);
        this.videoBG.play();
        this.videoBG.loop = true;
        this.add.image(0,0,'rose').setOrigin(0,0).setScrollFactor(0);
    }

    update() {

    }
}   