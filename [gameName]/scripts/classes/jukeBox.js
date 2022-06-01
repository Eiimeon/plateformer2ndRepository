/*##################################################################################################################################################
Classe : JukeBox

Le script qui gère la musique et dicte les actions de tous les objets rythmiques
##################################################################################################################################################*/
class JukeBox {

    // Le jukebox a besoin de deux scènes, celle dans la quelle la musique se joue (la musicScene), et celle dans laquelle sont les objets rythmiques à contoler (la levelScene)
    constructor(musicScene = null, levelScene = null) {
        this.musicScene = musicScene;
        this.levelScene = levelScene;
        this.timer; // Stocke le timeEvent qui sert de métronome

        this.on = false; // Le jukebox commence éteint
        this.beatCount = 1; // Le compte des beats, le jukebox commence à 1 parce qu'en musique on compte à partir de 1 comme les profanes

        this._sequence = [0, 1, 2, 1, 2, 3, 4, 3, 4, 5]; // L'ordre dans laquelle jouer les morceaux
        this.sequenceIndex = 0; // L'indice qui permet de savoir à quel morceau on en est

        // Construction des objets musicaux du niveau
        this._happy = new Array();
        this._happy.push(new MusicObj(musicScene, 'HP8', 16));
        this._happy.push(new MusicObj(musicScene, 'HP4'));
        this._happy.push(new MusicObj(musicScene, 'HP5'));
        this._happy.push(new MusicObj(musicScene, 'HP6'));
        this._happy.push(new MusicObj(musicScene, 'HP7'));
        this._happy.push(new MusicObj(musicScene, 'HP8', 16));

        this._cursedHappy = new Array();
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH1'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH2'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH3'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH4'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH5'));
        this._cursedHappy.push(new MusicObj(musicScene, 'cursedH6'));

        this._choice = [new MusicObj(musicScene, 'choice', 32)];
        this._choice[0].sound.setVolume(0.5);

        // Le niveau commence par happy
        this._music = this._happy;

        // currMusic stocke le morceau en cours, et commence parce que le premier extrait du premier morceau
        this.currMusic = this._music[0];
        this.currMusicBeatCount = 1;
    }

    setMusicScene(musicScene) {
        this.musicScene = musicScene;
    }

    setLevelScene(levelScene) {
        this.levelScene = levelScene;
    }

    // Commande tous les objets rythmiques de la levelscene. Internal est un booléen qui dit si ce tick a été commandé par le timer ou non
    tick(internal) {

        // Fait tick tout ce qui ressemble à une plateforme (cf levelScene.js)
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

        // Fait tick la denial de la levelScene s'il y en a une
        try { this.levelScene.denial.denialTick(this.beatCount); }
        catch (error) { /*console.log(error);*/}

        // Si le morceau en cours devrait être terminé (au vu du nombre de ticks), on coupe l'extrait en cours et on joue le prochain
        // Dans les faits, cela resynchronise le musique toutes les 8 secondes environ
        // Uniquement pour les internal ticks
        if (this.currMusicBeatCount == this.currMusic.beatLength && internal) {
            this.sequenceIndex += 1;
            this.sequenceIndex = this.sequenceIndex % this._sequence.length;
            this.currMusic.stop();
            this.currMusic = this._music[this._sequence[this.sequenceIndex]];
            this.currMusic.play();
            this.currMusicBeatCount = 0;
        }
    }

    // Démarre le jukebox et notamment son timer. Sert notamment à *redémarrer* lors des changements de morceaux. Remet la musique au début
    start() {
        if (this.on == false && this.levelScene != null) {
            this.on = true;
            this.currMusic = this._music[0];
            this.currMusic.play();

            // Main timer : delay : la durée d'un temps musical, fait un internal tick à chaque callback puis augmente le beatcount
            this.timer = this.musicScene.time.addEvent({
                delay: (1000 * 60) / 115, loop: true, callbackScope: this, callback: function() { 
                    this.tick(true);
                    this.beatCount += 1;
                    this.currMusicBeatCount += 1;
                }
            });
        }
    }

    // Stoppe le jukebox, il faudra le redémarrer 
    stop() {
        this.currMusic.stop(); // Important, elle ne s'arrête pas tout seule
        this.beatCount = 1;
        this.currMusicBeatCount = 1;
        this.sequenceIndex = 0;
        this.currMusic = this._music[0];
        this.on = false;
        
        this.timer.remove(); // On détruit le timer correctement, il sera refait au prochain start
    }
}   