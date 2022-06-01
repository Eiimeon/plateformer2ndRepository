/*##################################################################################################################################################
Classe : levelScene

La classe sont hérite toutes les scènes de niveau. Elle ne devrait jamais être instanciée sans qu'on en hérite.
Cela permet une standardisation et une centralisation du contenu des scènes de niveau pour un maximum de flexibilité.
Prend déjà en compte les mécaniques de blocs rythmiques mortels du niveau 2
##################################################################################################################################################*/
class levelScene extends Phaser.Scene {

    // Le constructeur récupère la config de la scène concrète qui hérite
    constructor(config) {
        super(config);

        // Toutes les scènes de niveau contiennent un joueur, des plateformes, des blocs mortels, les spawns du player, et les sorties (checkpoints)
        this.player;
        this.platforms;
        this.deathBoxes;
        this.spawns;
        this.checkpoints;

        // Il y a 8 vecteurs de plateformes qui obéissent à la nomenclature suivante :
        // p = plateforms et db = deathbox
        // 4 (resp. 8) signifie que le motif de plateformes ou de deathboxes se répète sur 4 (resp. 8) temps musicaux
        // La version overlap se trouve au même endroit mais supporte les overlaps, car elle ne contient pas de layers de Tiled (cf buildBetterHitBox)
        this.p4 = new Array(4);
        this.p4overlap = new Array(4).fill(new Array());
        this.db4 = new Array(4);
        this.db4overlap = new Array(4).fill(new Array());

        this.p8 = new Array(8);
        this.p8overlap = new Array(8).fill(new Array());
        this.db8 = new Array(8);
        this.db8overlap = new Array(8).fill(new Array());
    }

    // Remplit un array (hitboxVar) avec des objets de type rythmplat transparent dont la beatmap est donnée.
    // Une rythmplat est ajouté à chaque endroit où il n'y a rien de visible sur le layer (de tiled), ce qui correspond à layer.data[i][j].index >= 0
    buildBetterHitBox(layer, hitboxVar, beatmap) {
        for (let i = 0; i < layer.height; i++) {
            for (let j = 0; j < layer.width; j++) {
                if (layer.data[i][j].index >= 0) {
                    hitboxVar.push(new RythmPlat(this, j * 64, i * 64, 'transparent', beatmap).setOrigin(0, 0));
                }
            }
        }
    }

    // Création des plateformes depuis la map
    buildGamePlaformsFromMap(map, tileset) {

        // On crée directement plateforms et deathboxes
        this.platforms = map.createLayer('platforms', tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        this.deathBoxes = map.createLayer('deathBoxes', tileset);
        this.deathBoxes.setCollisionByExclusion(-1, true);

        // On remplit les 4 array qui ne sort pas overlap
        // On récupère le bon layer par son nom à partir de l'indice
        // On donne la map [1,0,0,0] au layer sur le premier temps, [0,1,0,0] au layer de temps 2 etc ...
        // Puis on transforme le layer en rythmMover qui le fait bouger en rythme
        for (let i = 0; i < 4; i++) {
            this.p4[i] = map.createLayer('4beats/plat4' + (i + 1), tileset);
            var beatmap = new Array(4).fill(0);
            beatmap[i] = 1;
            this.p4[i] = new RythmMover(this.p4[i], beatmap);
        }

        for (let i = 0; i < 4; i++) {
            this.db4[i] = map.createLayer('4beats/deathbox4' + (i + 1), tileset);
            var beatmap = new Array(4).fill(0);
            beatmap[i] = 1;
            this.db4[i] = new RythmMover(this.db4[i], beatmap);
        }

        for (let i = 0; i < 8; i++) {
            this.p8[i] = map.createLayer('8beats/plat8' + (i + 1), tileset);
            var beatmap = new Array(8).fill(0);
            beatmap[i] = 1;
            this.p8[i] = new RythmMover(this.p8[i], beatmap);
        }

        for (let i = 0; i < 8; i++) {
            this.db8[i] = map.createLayer('8beats/deathbox8' + (i + 1), tileset);
            var beatmap = new Array(8).fill(0);
            beatmap[i] = 1;
            this.db8[i] = new RythmMover(this.db8[i], beatmap);
        }

        // Ensuite on remplit les arrays overlap
        // On parcourt tous les layers et on regarde la première lettre de leur nom et leur longueur pour discriminer les layers qui nous intéressent
        // Ensuite on crée la map correcpondant au nom
        // Puis on utilise buildBetterHitbox

        map.layers.forEach(layer => {
            switch (layer.name[0] + '-' + layer.name.length) {

                // Patterns sur 4 temps

                case '4-13': // 4beats/plat4X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.p4overlap[index], beatmap);
                    break;

                case '4-17': // 4beats/deathbox4X
                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.db4overlap[index], beatmap);
                    break;

                // Patterns sur 8 temps 

                case '8-13': // 8beats/plat8X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.p8overlap[index], beatmap);
                    break;

                case '8-17': // 8beats/deathbox8X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.db8overlap[index], beatmap);
                    break;
            }
        })
    }

    // Construction de toutes les collisions standard
    buildCollisions() {

        // Colliders avec les layers
        this.physics.add.collider(this.player, this.platforms);

        // Les deathboxes tuent
        this.physics.add.collider(this.player, this.deathBoxes, function (currPlayer) {
            currPlayer.die(); 
        }, null, this);

        // Les arrays p collisionnent simplement
        // Les arrays db tuent
        // Les pOverlap ne sont pas encore utilisées. Pourraient permettre des collisions plus robustes si on ajoutait une mécanique de dash pas exemple
        // Les dbOverlap ne seront utilisées qu'à partir du niveau 2, elle permettent aux blocs mortels rythmiques de tuer le jouer quand ils spawn dessus

        // Colliders
        for (let i = 0; i < 4; i++) {
            this.p4[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.p4[i].plat);
        }

        for (let i = 0; i < 4; i++) {
            this.db4[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.db4[i].plat, function (currPlayer) {
                currPlayer.die();
            });
        }

        for (let i = 0; i < 8; i++) {
            this.p8[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.p8[i].plat);
        }

        for (let i = 0; i < 8; i++) {
            this.db8[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.db8[i].plat, function (currPlayer) {
                currPlayer.die();
            });
        }

        // Overlaps
        for (let i = 0; i < 4; i++) {
            this.physics.add.overlap(this.player, this.p4overlap[i]);
        }

        for (let i = 0; i < 4; i++) {
            this.physics.add.overlap(this.player, this.db4overlap[i], function (currPlayer) {
                currPlayer.die();
            });
        }

        for (let i = 0; i < 8; i++) {
            this.physics.add.overlap(this.player, this.p8overlap[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.physics.add.overlap(this.player, this.db8overlap[i], function (currPlayer) {
                currPlayer.die();
            });
        }

        // Autres : La collision avec le checkpoint qui lance la scène suivante

        this.physics.add.overlap(this.player, this.checkpoints, () => {
            // Calcule le nom de la scène suivant à partir du nom de la scène actuelle et du LEVELORDER
            let nextIndex = 1 + LEVELORDER.findIndex((element) => {
                return ('L1_' + element == this.scene.key);
            });
            this.scene.start('L1_' + (LEVELORDER[nextIndex]), this.musicScene);
        });
    }

    // La seule méthode dans le create d'une scène qui n'a rien de spécial. Tu y est.
    buildLevel(map, tileset) {

        // Sons
        this.sound.add('moan'); // Le son de mort

        // Décor : Deux layers de parallaxe 
        this.add.image(0, 0, 'parallax2_' + this.scene.key).setOrigin(0, 0).setScrollFactor(0.25, 0.25);
        this.currLevelParallax = this.add.image(0, 128, 'parallax' + this.scene.key).setOrigin(0, 0);
        this.currLevelParallax.setScrollFactor(0.5, 0.5);
        console.log(this.scene.key);
        // On met le fond 1_9 au niveau 1_8, c'est un peu osbolette 
        if (this.scene.key == 'L1_8') {
            this.add.image(0, 0, 'fond1_9').setOrigin(0);
        }
        // Les pointillés indiquent l'emplacement des palteformes quand elles ne sont pas là 
        map.createLayer('pointilles', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        // Le checkpoint fait office de sortie vers l'écran suivant
        var _checkpoints = this.physics.add.group({ allowGravity: false, immovable: true });
        map.getObjectLayer('portals').objects.forEach(function (currCheck) { _checkpoints.create(currCheck.x, currCheck.y - 64, 'greenBlock').setOrigin(0); });
        this.checkpoints = _checkpoints;

        // On spawn au layer au premier spawn du layer de spawns
        this.spawns = map.getObjectLayer('spawns').objects;
        this.player = new Chara(this, this.spawns[0].x - 64, this.spawns[0].y - 3 * 64, 'miko').setOrigin(0, 0);
    
        // Collisions

        this.buildCollisions();

        // Camera
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setFollowOffset(-64, -3*64);
        cam.setBounds(64, 64, map.width * 64 - 128, map.height * 64 - 3 * 64, true, true, true); // Empêche de voir la hors des limites donnée, (donc notamment la ceinture de blocs rouges mortels autout du niveau, précaustion contre le softlock)
        cam.setZoom(1.2);
        this.cameras.main.fadeIn(1000); // Un petit fondu au début de chaque scène pour adoucir la transition entre les scènes


        // Touches utilisées
        this.cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // A la création on fait tick toutes les plateformes pour qu'elles soient au bon endroit.
        // false signifie que le tick ne vient pas du jukebox, donc il ne fait pas avancer le métronome
        this.musicScene.jukebox.tick(false);
    }

    // Update standard, à mettre dans l'update des scènes qui héritent
    standardUpdate(time, delta) {

        // La touche p met en pause
        if (this.keyP.isDown) {
            console.log('Pause');
            this.scene.run('PauseMenu');
            this.musicScene.pauseMusic.play();
            this.scene.bringToTop('PauseMenu');
            this.scene.pause();
            this.musicScene.scene.pause();
            this.musicScene.jukebox.currMusic.pause();
        }

        // Le raccourci alt+q permet d'aller au dernier écran pour montrer les fins au jurys
        if (this.keyQ.altKey) {
            this.scene.start('L1_8',this.musicScene);
        }

        // Actions (cf chara.js)
        if (!this.player.dead) {
            this.player.move(this.cursors, this.keySpace, this.keyQ, this.keyD);
            this.player.jump(this.keySpace, this.cursors, time);
            this.player.animate(this.cursors, time);
            this.player.restoreAbilities();
        }
    }

    // A sa création, la levelScene reçoit la musicScene et les deux se connectent mutuellement
    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.jukebox.setLevelScene(this);
        this.musicScene.levelScene = this;
        console.log('Nouvelle scene : ' + this.scene.key);
    }

    update(time, delta) { }
}
