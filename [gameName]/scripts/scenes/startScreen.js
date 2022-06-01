/*##################################################################################################################################################
Classe : StartScreen

La deuxième scène. Elle fait office de scène de chargement, elle contient presque tous les preloads.
##################################################################################################################################################*/
class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })
    }

    preload() {
        // Images utilisées en UI
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('bras', 'assets/images/bras.png');
        this.load.image('pause', 'assets/images/pause.png');
        this.load.image('controls', 'assets/images/controls.png');
        this.load.image('controlsNoFrame', 'assets/images/controlsNoFrame.png');
        this.load.image('fin1_1', 'assets/images/fin1_1.png');
        this.load.image('fin1_2', 'assets/images/fin1_2.png');
        this.load.image('fin2', 'assets/images/fin2.png');
        this.load.image('credits', 'assets/images/credits.png');


        // Maps Level 1
        this.load.tilemapTiledJSON('L1_0', 'assets/images/map/L1_0.tmj');
        this.load.tilemapTiledJSON('L1_1', 'assets/images/map/L1_1.tmj');
        this.load.tilemapTiledJSON('L1_2', 'assets/images/map/L1_2.tmj');
        this.load.tilemapTiledJSON('L1_3', 'assets/images/map/L1_3.json');
        this.load.tilemapTiledJSON('L1_4', 'assets/images/map/L1_4.json');
        this.load.tilemapTiledJSON('L1_5', 'assets/images/map/L1_5.json');
        this.load.tilemapTiledJSON('L1_7', 'assets/images/map/L1_7.json');
        this.load.tilemapTiledJSON('L1_8', 'assets/images/map/L1_8.json');
        this.load.tilemapTiledJSON('L1_9', 'assets/images/map/L1_9.json');

        // Tilset
        this.load.image('tileset', 'assets/images/map/tilesetFinal.png')

        // Spritesheets
        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });
        this.load.spritesheet('slimeSheet', 'assets/images/chara2ToSpriteSheet.png', { frameWidth: 774, frameHeight: 1554 });
        this.load.spritesheet('denialSlimeSheet', 'assets/images/denialToSpriteSheet.png', { frameWidth: 774, frameHeight: 1554 });
        this.load.spritesheet('beamSpritesheet', 'assets/images/beamSpritesheet.png', { frameWidth: 6400, frameHeight: 128 });

        // Dans le fond
        this.load.video('audioVizHappy', 'assets/videos/audioVizHappyLowD.mp4');
        this.load.image('rose', 'assets/images/levelBGs/rose.png');


        for (let i = 0; i < 10; i++) {
            if (i != 6) {
                this.load.image('parallaxL1_' + i, 'assets/images/levelBGs/parallax1_' + i + '.png');
                this.load.image('parallax2_L1_' + i, 'assets/images/levelBGs/parallax2_1_' + i + '.png');
            }
        }

        // A fins cinématiques
        this.load.image('overlay1_9', 'assets/images/overlay1_9.png');
        this.load.image('fond1_9', 'assets/images/fond1_9.png');
        this.load.image('blueFilter', 'assets/images/blueFilter.png');
        this.load.image('blackStrip', 'assets/images/blackStrip.png');
        this.load.image('worthTrying', 'assets/images/worthTrying.png');
        this.load.image('doesntHeal', 'assets/images/doesntHeal.png');

        // Petits assets
        this.load.image('greenBlock', 'assets/images/greenBlock.png');
        this.load.image('transparent', 'assets/images/transparent.png');

        // Audio

        // StartScreen
        this.load.audio('rain', 'assets/musiques/rain2.mp3');
        this.load.audio('1234', 'assets/musiques/1234.mp3');

        //Musiques
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

        this.load.audio('sad', 'assets/musiques/sad.mp3');

        // Sons de pause
        this.load.audio('pauseMajor', 'assets/musiques/pauseMajeur.mp3');
        this.load.audio('pauseMinor', 'assets/musiques/pauseMineur.mp3');

        // Sound effects
        this.load.audio('denialEntranceSound', 'assets/musiques/denialEntranceSound.mp3');
        this.load.audio('moan', 'assets/musiques/hitHurt.wav');
        this.load.audio('jackNoise', 'assets/musiques/jackNoise.mp3')
    }



    create() {
        // On dissocie les bras du fond, car les deux bougent indépendantement
        // On stocke leur position dans des vector2 pour utiliser la methode lerp des vecteurs
        this.titleScreen = this.add.image(0, 0, 'titleScreen').setOrigin(0.1, 0.1).setScale(1.3);
        this.screenPos = new Phaser.Math.Vector2(this.titleScreen.x, this.titleScreen.y)
        this.arms = this.add.image(70, 40, 'bras').setOrigin(0, 0).setScale(1);
        this.armsInitialPos = new Phaser.Math.Vector2(this.arms.x, this.arms.y)
        this.armsPos = new Phaser.Math.Vector2(this.arms.x, this.arms.y)
        this.cameras.main.fadeIn(1000);

        // Sons
        this.rain = this.sound.add('rain').setLoop(true).setVolume(1).play();
        this.preMusic = this.sound.add('1234').setVolume(0.3);

        // Toutes les 70ms les mains lerp vers une position aléatoire à maximum 10px de distance de leur position de départ
        // Pour un effet shake sans passer par la caméra
        this.time.addEvent({
            delay: 70, loop: true, callbackScope: this, callback: () => {
                var randomShakeVector = new Phaser.Math.Vector2(Phaser.Math.RandomXY(Phaser.Math.Vector2.ONE, 10*Math.random()));
                randomShakeVector.add(this.armsInitialPos);
                this.armsPos.lerp(randomShakeVector, 0.5);
                this.arms.x = this.armsPos.x;
                this.arms.y = this.armsPos.y;
            }
        })
    }

    update(time) {

        // A chaque frame, le fond lerp vers la position sur la courbe de Lissajou à cet instant donné
        // Un peu dépendant des performances de la machine sur le niveau de retard mais sans plus (mériterait potentiellement un cadençage)
        var breathingVector = lissajousCurve(time / 3000).scale(50);
        this.screenPos.lerp(breathingVector, 0.5);
        this.titleScreen.x = this.screenPos.x;
        this.titleScreen.y = this.screenPos.y;

        // Space déclenche le jeu
        // Il y a un zoom sur le jaune du smiley qui va se confondre avec le jaune des cheveux du personnage au moment du changement de scène
        // Effet faux plan séquence
        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.sound.stopAll();
            this.sound.play('1234');
            this.cameras.main.zoomTo(200, 2200, Phaser.Math.Easing.Quadratic.In)
            this.time.addEvent({
                delay: 2200, callbackScope: this, callback: () => {
                    this.scene.start('MusicAndData');
                }
            })
        }
    }
}   