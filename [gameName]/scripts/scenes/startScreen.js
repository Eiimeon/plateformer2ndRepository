class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })
    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('bras', 'assets/images/bras.png');
        this.load.image('pause', 'assets/images/pause.png');
        this.load.image('controls', 'assets/images/controls.png');
        this.load.image('controlsNoFrame', 'assets/images/controlsNoFrame.png');
        this.load.image('fin1', 'assets/images/fin1.png');
        this.load.image('fin2', 'assets/images/fin2.png');
        this.load.image('credits', 'assets/images/credits.png');


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
        this.load.spritesheet('denialSlimeSheet', 'assets/images/denialToSpriteSheet.png', { frameWidth: 774, frameHeight: 1554 });
        this.load.spritesheet('beamSpritesheet', 'assets/images/beamSpritesheet.png', { frameWidth: 6400, frameHeight: 128 });

        this.load.image('fond', 'assets/images/protoFond.png');
        this.load.video('audioVizHappy', 'assets/videos/audioVizHappyLowD.mp4');
        this.load.image('videoPlaceholder', 'assets/images/videoPlaceholder.png');
        this.load.image('rose', 'assets/images/levelBGs/rose.png');


        for (let i = 0; i < 10; i++) {
            if (i != 6) {
                this.load.image('parallaxL1_' + i, 'assets/images/levelBGs/parallax1_' + i + '.png');
                this.load.image('parallax2_L1_' + i, 'assets/images/levelBGs/parallax2_1_' + i + '.png');
            }
        }

        this.load.image('overlay1_9', 'assets/images/overlay1_9.png');
        this.load.image('fond1_9', 'assets/images/fond1_9.png');
        this.load.image('blueFilter', 'assets/images/blueFilter.png');
        this.load.image('blackStrip', 'assets/images/blackStrip.png');




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

        this.load.audio('rain', 'assets/musiques/rain.mp3');

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

        this.load.audio('choice', 'assets/musiques/choice.mp3');

        this.load.audio('pauseMajor', 'assets/musiques/pauseMajeur.mp3');
        this.load.audio('pauseMinor', 'assets/musiques/pauseMineur.mp3');


        this.load.audio('denialEntranceSound', 'assets/musiques/denialEntranceSound.mp3');
        this.load.audio('deathPiano', 'assets/musiques/deathPiano.mp3');
        this.load.audio('moan', 'assets/musiques/hitHurt.wav');
    }



    create() {
        this.titleScreen = this.add.image(0, 0, 'titleScreen').setOrigin(0.1, 0.1).setScale(1.3);
        this.screenPos = new Phaser.Math.Vector2(this.titleScreen.x, this.titleScreen.y)
        this.arms = this.add.image(70, 40, 'bras').setOrigin(0, 0).setScale(1);
        this.armsInitialPos = new Phaser.Math.Vector2(this.arms.x, this.arms.y)
        this.armsPos = new Phaser.Math.Vector2(this.arms.x, this.arms.y)
        this.cameras.main.fadeIn(1000);
        // this.cameras.main.shake(10000,0.00005);
        this.rain = this.sound.add('rain').setLoop(true).setVolume(0.1).play();

        this.time.addEvent({
            delay: 70, loop: true, callbackScope: this, callback: () => {
                console.log('hand shake')
                var randomShakeVector = new Phaser.Math.Vector2(Phaser.Math.RandomXY(Phaser.Math.Vector2.ONE, 10*Math.random()));
                randomShakeVector.add(this.armsInitialPos);
                this.armsPos.lerp(randomShakeVector, 0.5);
                this.arms.x = this.armsPos.x;
                this.arms.y = this.armsPos.y;
            }
        })
    }

    update(time) {

        var breathingVector = lissajousCurve(time / 3000).scale(50);
        this.screenPos.lerp(breathingVector, 0.5);
        this.titleScreen.x = this.screenPos.x;
        this.titleScreen.y = this.screenPos.y;






        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.sound.stopAll();
            this.cameras.main.zoomTo(200, 3000, Phaser.Math.Easing.Quadratic.In)
            this.time.addEvent({
                delay: 3000, callbackScope: this, callback: () => {
                    this.scene.start('MusicAndData');
                }
            })
            // this.scene.start('MusicAndData');
        }
    }
}   