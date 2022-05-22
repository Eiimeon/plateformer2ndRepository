class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })

    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('pause', 'assets/images/pause.png');

        // Maps Level 1
        this.load.tilemapTiledJSON('L1_0', 'assets/images/map/L1_0.tmj');
        this.load.tilemapTiledJSON('L1_1', 'assets/images/map/L1_1.tmj');
        this.load.tilemapTiledJSON('L1_2', 'assets/images/map/L1_2.tmj');
        this.load.tilemapTiledJSON('L1_3', 'assets/images/map/L1_3.json');
        this.load.tilemapTiledJSON('L1_4', 'assets/images/map/L1_4.json');
        this.load.tilemapTiledJSON('L1_5', 'assets/images/map/L1_5.json');
        this.load.tilemapTiledJSON('L1_6', 'assets/images/map/L1_6.json');
        this.load.tilemapTiledJSON('L1_7', 'assets/images/map/L1_7.json');
        this.load.tilemapTiledJSON('L1_8', 'assets/images/map/L1_8.json');
        this.load.tilemapTiledJSON('L1_9', 'assets/images/map/L1_9.json');

        this.load.image('tileset', 'assets/images/map/tilesetFinal.png')

        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });
        this.load.spritesheet('slimeSheet', 'assets/images/chara2ToSpriteSheet.png', { frameWidth: 774, frameHeight: 1554 });

        this.load.image('fond', 'assets/images/protoFond.png');
        this.load.video('audioVizHappy','assets/videos/audioVizHappyLowD.mp4');
        this.load.image('videoPlaceholder','assets/images/videoPlaceholder.png');
        this.load.image('rose','assets/images/levelBGs/rose.png');


        for (let i = 0 ; i<9 ; i++) {
            this.load.image('parallaxL1_'+i, 'assets/images/levelBGs/parallax1_'+i+'.png');
            this.load.image('parallax2_L1_'+i, 'assets/images/levelBGs/parallax2_1_'+i+'.png');
        }

        this.load.image('overlay1_9', 'assets/images/overlay1_9.png');
        this.load.image('fond1_9', 'assets/images/fond1_9.png');
        this.load.image('blueFilter', 'assets/images/blueFilter.png');


        this.load.image('bSquare', 'assets/images/bSquare.png');
        this.load.image('miko', 'assets/images/miko0.png');
        this.load.image('denial', 'assets/images/denialProto.png');
        this.load.image('crash', 'assets/images/crash.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('bg', 'assets/images/sky.png');
        this.load.image('crate', 'assets/images/crate.png');
        this.load.image('peche', 'assets/images/peche.png');
        this.load.image('testNet', 'assets/images/testNet.PNG');
        this.load.image('greenBlock', 'assets/images/greenBlock.png');
        this.load.image('transparent', 'assets/images/transparent.png');
        this.load.image('beam', 'assets/images/beam.png');

        this.load.audio('happy', 'assets/musiques/happy1.mp3');
        this.load.audio('HP4', 'assets/musiques/HP4.mp3');
        this.load.audio('HP5', 'assets/musiques/HP5.mp3');
        this.load.audio('HP6', 'assets/musiques/HP6.mp3');
        this.load.audio('HP7', 'assets/musiques/HP7.mp3');
        this.load.audio('HP8', 'assets/musiques/HP8.mp3');

        this.load.audio('cursedH1', 'assets/musiques/curseH1.mp3');
        this.load.audio('cursedH2', 'assets/musiques/curseH2.mp3');
        this.load.audio('cursedH3', 'assets/musiques/curseH3.mp3');
        this.load.audio('cursedH4', 'assets/musiques/curseH4.mp3');
        this.load.audio('cursedH5', 'assets/musiques/curseH5.mp3');
        this.load.audio('cursedH6', 'assets/musiques/curseH6.mp3');

        this.load.audio('pauseMajor', 'assets/musiques/pauseMajeur.mp3');
        this.load.audio('pauseMinor', 'assets/musiques/pauseMineur.mp3');


        this.load.audio('denialEntranceSound', 'assets/musiques/denialEntranceSound.mp3');
        this.load.audio('deathPiano','assets/musiques/deathPiano.mp3');
        this.load.audio('moan','assets/musiques/hitHurt.wav');
    }

    create() {
        this.add.image(0, 0, 'titleScreen').setOrigin(0, 0).setScale(1);
        this.cameras.main.fadeIn(1000);
    }

    update() {
        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.scene.start('MusicAndData');
        }
    }
}   