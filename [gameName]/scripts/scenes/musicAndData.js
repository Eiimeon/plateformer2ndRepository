/*##################################################################################################################################################
Classe : MusicAndData

Une scène qui tourne derrière le niveau et permet de ne pas interrompre la musique quand on chjange d'écran typiquement.
Elle se souvient aussi de certaines informations comme si des cinématiques ont été vues ou non.
Elle est stockée dans un attribut de la scène de niveau sous le nom de musicScene
##################################################################################################################################################*/
class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })

        // Flags de cinématiques
        this.seenCinematic1_5 = false ;
        this.playingCinematic1_5 = false ;

        this.seenCinematic1_8 = false ;

    }

    preload() { }

    create() {
        
        // A sa création par le startScreen, la musicScene lance le premier écran de jeu
        this.scene.run('L1_'+LEVELORDER[STARTLEVELINDEX],this);
        this.levelScene = this.scene.get('L1_'+LEVELORDER[STARTLEVELINDEX]);

        // La musicScene construit le jukebox et le démare pour le première fois. C'est donc happy qui joue
        this.jukebox = new JukeBox(this,this.levelScene);
        this.jukebox.start();

        // Initialisation du premier son de pause
        this.pauseMusic = this.sound.add('pauseMajor').setVolume(0.15).setLoop(true);

        // Fond vidéo. Le remplacer par du svg temps réel est sûrement la source d'optimisation mémoire la plus urgente.
        this.videoBG = this.add.video(-2*64 - 32,-4*64,'audioVizHappy').setOrigin(0,0).setScrollFactor(0).setScale(1.3);
        this.videoBG.setLoop(true);
        this.videoBG.play();
        this.videoBG.loop = true;
        this.add.image(0,0,'rose').setOrigin(0,0).setScrollFactor(0); // Un fond en transparence par dessus l'audioviz pour une veillere harmonie avec le décor
    }

    update() {

    }
}   