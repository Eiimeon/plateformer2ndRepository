/*##################################################################################################################################################
Classe : L1_8

Une scène de niveau. Elle hérite de levelScene.
Ainsi, elle est sur une base extrêmement standardisée. Mais il peut y avoir des ajouts spécifiques
C'est la dernière scène de niveau en jeu
##################################################################################################################################################*/
class L1_8 extends levelScene {

    constructor() {
        super({
            key: 'L1_8',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    // debug: true
                }
            }
        })
        // Deux flags pour savoir si les textes vers la fin de droite sont défà affichés ou pas
        this.rightText1Showing;
        this.rightText2Showing;
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_8' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        // On ajoute un fond somble spécial pour sur la musicScene, qui se trouve derrière
        this.musicScene.overlay1_9 = this.musicScene.add.image(0, 0, 'fond1_9').setOrigin(0, 0);

        // Cette scène utilise la musique 'choice', alors le jukebox change de musique. Cela sert aussi de resync pour la cinématique
        this.musicScene.jukebox.stop();
        this.musicScene.jukebox._music = this.musicScene.jukebox._choice;
        this.musicScene.jukebox._sequence = [0];
        this.musicScene.jukebox.start();


        this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);

        // On met en place les triggers qui détectent la fin du jeu, à gauche et à droite
        // Toucher les fins coupe la musique
        var _endTriggersLeft = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('finGauche').objects.forEach(function (currTrigger) { _endTriggersLeft.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.endTriggersLeft = _endTriggersLeft;

        var _endTriggersRight = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('finDroite').objects.forEach(function (currTrigger) { _endTriggersRight.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.endTriggersRight = _endTriggersRight;

        this.physics.add.overlap(this.player,this.endTriggersLeft,() => {
            this.musicScene.jukebox.currMusic.stop();
            this.musicScene.scene.stop();
            this.scene.start('EndScene','gauche');
        }) 

        this.physics.add.overlap(this.player,this.endTriggersRight,() => {
            this.musicScene.jukebox.currMusic.stop();
            this.musicScene.scene.stop();
            this.scene.start('EndScene','droite');
        }) 

        
        // Cinématique
        if (!this.musicScene.seenCinematic1_8) {

            // Les bandes noires comme au cinéma
            var topStrip = this.add.image(0, 64, 'blackStrip').setOrigin(0).setScrollFactor(0);
            var botStrip = this.add.image(0, 880, 'blackStrip').setOrigin(0).setScrollFactor(0);


            // On spawn un Denial et on lui ajoute des collisions avec les rythmplats des layers 1234
            this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
            console.log(this.denialSpawns[0]);
            this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 0]);

            for (let i = 0; i < 4; i++) {
                this.p4[i].plat.setCollisionByExclusion(-1, true);
                this.physics.add.collider(this.denial, this.p4[i].plat);
            }

            // La caméra suit la Denial pendant la cinématique
            this.cameras.main.startFollow(this.denial).setFollowOffset(0,-3*64);

            // Deuxième couche de filtre bleu pour avoir un écran très bleu et sombre
            this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);

            this.bD = 1000 * 60 / 115; // beat duration

            // Commandes initiales
            this.runInput = 'immobile';
            this.jumpInput = 'held';
            this.denialOnGround = false; // Indiquera qu'il faut animer la marche lorsque que Denial passera en 0g

            // Ici on commande indépendament la course et le saut de la Denial avec des timer inbriqués les uns dans les autres :
            // Un timer donne une instruction et lance un autre timer qui donne une instruction et lance un autre timer qui etc...

            // denial jump
            this.time.addEvent({
                delay: this.bD, callbackScope: this, callback: function () {
                    this.jumpInput = 'eld';
                    this.time.addEvent({
                        delay: this.bD, callbackScope: this, callback: function () {
                            this.jumpInput = 'held';
                            this.time.addEvent({
                                delay: this.bD, callbackScope: this, callback: function () {
                                    this.jumpInput = 'eld';
                                    this.time.addEvent({
                                        delay: this.bD, callbackScope: this, callback: function () {
                                            this.jumpInput = 'held';
                                            this.time.addEvent({
                                                delay: this.bD, callbackScope: this, callback: function () {
                                                    this.jumpInput = 'eld';
                                                    this.time.addEvent({
                                                        delay: this.bD, callbackScope: this, callback: function () {
                                                            this.jumpInput = 'held';
                                                            this.time.addEvent({
                                                                delay: this.bD, callbackScope: this, callback: function () {
                                                                    this.jumpInput = 'eld';
                                                                    this.time.addEvent({
                                                                        delay: this.bD, callbackScope: this, callback: function () {
                                                                            this.jumpInput = 'held';
                                                                            this.time.addEvent({
                                                                                delay: this.bD / 2, callbackScope: this, callback: function () {
                                                                                    this.jumpInput = 'eld';
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

            // denial move
            this.time.addEvent({
                delay: this.bD / 2, callbackScope: this, callback: function () {
                    this.runInput = 'right';
                    this.time.addEvent({
                        delay: this.bD / 2, callbackScope: this, callback: function () {
                            this.runInput = 'immobile';
                            this.time.addEvent({
                                delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                    this.runInput = 'left';
                                    this.time.addEvent({
                                        delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                            this.runInput = 'immobile';
                                            this.time.addEvent({
                                                delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                    this.runInput = 'right';
                                                    this.time.addEvent({
                                                        delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                            this.runInput = 'immobile';
                                                            this.time.addEvent({
                                                                delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                                    this.runInput = 'left';
                                                                    this.time.addEvent({
                                                                        delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                                            this.runInput = 'immobile';
                                                                            this.time.addEvent({
                                                                                delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                                                    this.runInput = 'left';
                                                                                    this.time.addEvent({
                                                                                        delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                                                            this.runInput = 'immobile';
                                                                                            this.time.addEvent({
                                                                                                delay: 2 * this.bD / 2, callbackScope: this, callback: function () {
                                                                                                    this.runInput = 'left';
                                                                                                    this.denial.setGravityY(-g);
                                                                                                    this.denialOnGround = true;
                                                                                                    this.time.addEvent({
                                                                                                        delay: 14 * this.bD / 2, callbackScope: this, callback: function () {
                                                                                                            this.runInput = 'immobile';
                                                                                                            this.cameras.main.startFollow(this.player);
                                                                                                            this.cameras.main.setFollowOffset(0, -3*64);
                                                                                                            this.player.setVelocityY(0);
                                                                                                            this.player.x = this.denialSpawns[0].x
                                                                                                            this.player.y = this.denialSpawns[0].y - 64 * 3;
                                                                                                            topStrip.y = -64;
                                                                                                            botStrip.y = -64;
                                                                                                            this.musicScene.seenCinematic1_8 = true;
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    update(time, delta) {

        // On donne à la denial le pouvoir de bouger dans l'update. Le flip est géré ici aussi
        this.denial.move(this.runInput);
        this.denial.jump(this.jumpInput);
        this.denial.animate(this.runInput,time);
        if (this.denial.body.velocity.x > 0) {
            this.denial.initialFlip = false;
            this.denial.flipX = false;
        }
        else if (this.denial.body.velocity.x < 0) {
            this.denial.initialFlip = true;
            this.denial.flipX = true;
        }

        this.standardUpdate(time, delta);

        // Triggers positionnels pour spawn les textes sur le mur côté droit
        if (this.player.x > 2200 && !this.rightText1Showing) {
            this.add.image(2000,1000,'worthTrying');
        }
        if (this.player.x > 2500 && !this.rightText1Showing) {
            this.add.image(2800,1100,'doesntHeal');
        }
    }

}