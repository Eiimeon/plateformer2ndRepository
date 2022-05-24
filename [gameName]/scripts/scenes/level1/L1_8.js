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
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_8' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.musicScene.overlay1_9 = this.musicScene.add.image(0, 0, 'fond1_9').setOrigin(0, 0);
        // console.log(this.musicScene);
        // this.musicScene.add.image(0,0,'overlay1_9').setOrigin(0,0);

        this.musicScene.jukebox.stop();
        this.musicScene.jukebox._music = this.musicScene.jukebox.choice;
        this.musicScene.jukebox._sequence = [0];
        this.musicScene.jukebox.start();
        console.log(this.musicScene.jukebox.currMusic);

        this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);

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

        

        if (!this.musicScene.seenCinematic1_8) {

            var topStrip = this.add.image(0, 64, 'blackStrip').setOrigin(0).setScrollFactor(0);
            var botStrip = this.add.image(0, 880, 'blackStrip').setOrigin(0).setScrollFactor(0);


            this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
            console.log(this.denialSpawns[0]);
            this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 0]);

            this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);

            for (let i = 0; i < 4; i++) {
                this.p4[i].plat.setCollisionByExclusion(-1, true);
                this.physics.add.collider(this.denial, this.p4[i].plat);
            }

            this.cameras.main.startFollow(this.denial).setFollowOffset(0,-3*64);

            this.bD = 1000 * 60 / 115; // beat duration
            this.currStep = 0;

            this.runInput = 'immobile';
            this.jumpInput = 'held';
            this.denialOnGround = false; // Indiquera qu'il faut animer la marche lorsque que Denial passera en 0g


            // denial jump
            this.time.addEvent({
                delay: this.bD, callbackScope: this, callback: function () {
                    this.jumpInput = 'eld';
                    console.log(this.jumpInput);
                    this.time.addEvent({
                        delay: this.bD, callbackScope: this, callback: function () {
                            this.jumpInput = 'held';
                            console.log(this.jumpInput);
                            this.time.addEvent({
                                delay: this.bD, callbackScope: this, callback: function () {
                                    this.jumpInput = 'eld';
                                    console.log(this.jumpInput);
                                    this.time.addEvent({
                                        delay: this.bD, callbackScope: this, callback: function () {
                                            this.jumpInput = 'held';
                                            console.log(this.jumpInput);
                                            this.time.addEvent({
                                                delay: this.bD, callbackScope: this, callback: function () {
                                                    this.jumpInput = 'eld';
                                                    console.log(this.jumpInput);
                                                    this.time.addEvent({
                                                        delay: this.bD, callbackScope: this, callback: function () {
                                                            this.jumpInput = 'held';
                                                            console.log(this.jumpInput);
                                                            this.time.addEvent({
                                                                delay: this.bD, callbackScope: this, callback: function () {
                                                                    this.jumpInput = 'eld';
                                                                    console.log(this.jumpInput);
                                                                    this.time.addEvent({
                                                                        delay: this.bD, callbackScope: this, callback: function () {
                                                                            this.jumpInput = 'held';
                                                                            console.log(this.jumpInput);
                                                                            this.time.addEvent({
                                                                                delay: this.bD / 2, callbackScope: this, callback: function () {
                                                                                    this.jumpInput = 'eld';
                                                                                    console.log(this.jumpInput);
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
        else { }
    }

    update(time, delta) {

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
    }

}