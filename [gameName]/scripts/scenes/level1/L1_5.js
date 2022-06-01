/*##################################################################################################################################################
Classe : L1_5

Une scène de niveau. Elle hérite de levelScene.
Ainsi, elle est sur une base extrêmement standardisée. Mais il peut y avoir des ajouts spécifiques
##################################################################################################################################################*/
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

        // Première scène avec Denial. On la spawn avec les triggers qui la font disparaître quand on les touche
        this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
        if (this.musicScene.seenCinematic1_5) { // On ne la fait spawns que si on a déjà vu la cinématique, sinon on la fera spawn au moment opportun
            this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 1]);
        }

        var _denialTriggers = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers').objects.forEach(function (currTrigger) { _denialTriggers.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers = _denialTriggers;


        this.physics.add.overlap(this.player, this.denialTriggers, () => {
            this.denial.kill();
        })
    }

    // Les steps sont des méthodes qui se lancent les unes après les autres pour faire une cinématique

    step2() {
        // Des bandes noires nous font nous sentir comme au cinéma
        this.topStrip = this.add.image(0,64,'blackStrip').setOrigin(0).setScrollFactor(0);
        this.botStrip = this.add.image(0,880,'blackStrip').setOrigin(0).setScrollFactor(0);

        // Le player s'immobillise et a peur
        this.player.setVelocityX(0);
        this.player.play('die');

        // Denial fait son entrée en tirant un laser
        this.sound.add('denialEntranceSound').setVolume(0.3);
        this.sound.play('denialEntranceSound');
        this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 1]);
        this.denial.forceTick();
        
        // La musique s'arrête et le fond se fige
        this.musicScene.jukebox.stop();
        this.musicScene.videoBG.setPaused();

        // L'écran se bleute
        this.add.image(0,0,'blueFilter').setOrigin(0,0).setScrollFactor(0);

        // La caméra shake
        this.cameras.main.shake(1000, 0.002, false);

        // Dans une seconde on envoie le step3
        this.time.addEvent({ delay: 1000, callbackscope: this, callback: () => this.step3() })
    }

    step3() {
        // Pan du personnage joueur jusqu'à Denial
        this.cameras.main.pan(this.denial.x0+32, this.denial.y0+160, 5000, 'Sine.easeInOut');

        // Dans 5 secondes on envoie le step4
        this.time.addEvent({ delay: 5000, callbackScope: this, callback: this.step4 });
    }

    // Le step de nettoyage
    step4() {
        // On enlève l'anim de mort
        this.player.play('idle');

        // On passe sur cursedHappy au niveau du jukebox et on change aussi le son de pause
        this.musicScene.pauseMusic = this.musicScene.sound.add('pauseMinor');
        this.musicScene.jukebox._music = this.musicScene.jukebox._cursedHappy;
        this.musicScene.jukebox._currMusic = this.musicScene.jukebox._music[0];
        this.musicScene.jukebox.start();

        // On redémarre le fond depuis le début
        this.musicScene.videoBG.play();
        this.musicScene.videoBG.seekTo(0);

        // Fini le cinéma
        this.topStrip.y = -64;
        this.botStrip.y = -64;

        // On considère la cinématique lue
        this.musicScene.seenCinematic1_5 = true;
        this.musicScene.playingCinematic1_5 = false;
    }

    // Update un peu spéciale ici. Dans ce niveau tant qu'on a pas vu la cinématique, on ne peut pas sauter, et les touches de sauf lancent la cinématique. 
    // Ensuite on repasse en update standard
    update(time, delta) {

        if (!this.musicScene.playingCinematic1_5) {
            this.player.move(this.cursors, this.keySpace, this.keyQ,this.keyD);
            this.player.animate(this.cursors);
        }

        if ((this.keySpace.isDown || this.cursors.up.isDown) && !this.musicScene.seenCinematic1_5 == true && !this.musicScene.playingCinematic1_5 == true) {
            this.musicScene.playingCinematic1_5 = true;
            this.step2();
        }

        if (this.musicScene.seenCinematic1_5) {
            this.standardUpdate(time, delta);
        }
    }
}