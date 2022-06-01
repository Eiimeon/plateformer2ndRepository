/*##################################################################################################################################################
Classe : Denial

Le corps physique de l'antagoniste
A l'effigie de la petite soeur du protagoniste
##################################################################################################################################################*/
class Denial extends Phaser.Physics.Arcade.Sprite {

    // Un sprite qui nécessite une information de flip initial et une beatMap 
    constructor(_scene, _x, _y, _key, _flip = false, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        // Les offsets sont des ajustements pour compenser des soucis au moment du scaling
        super(_scene, _x - 32, _y - 160, _key);
        this.offsetX = 32;
        this.offsetY = 160;
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        // Mêmes dimensions que le chara
        this.body.setImmovable(true);
        this.setOrigin(0, 0);
        this.setScale(1 / 4)
        this.setSize(64 * 4, 128 * 4);
        this.body.setOffset(64 * 4, 2.5 * 4 * 64);

        // On garde la scène, la beatMap, le flip, et les coordonnées de spawn en mémoire
        this.scene = _scene;
        this.map = _beatMap;
        this.initialFlip = _flip;
        this.x0 = _x-32;
        this.y0 = _y-160;

        // Dit si l'objet est allumé, conditionne le tir de lasers
        this.on = true;

        // Le denial arrive avec son laser. C'est un sprite animé qui ne peut pas tomber.
        this.beam = new Phaser.Physics.Arcade.Sprite(_scene, 0, 0, 'beam').setOrigin(0, 0);
        _scene.add.existing(this.beam);
        _scene.physics.add.existing(this.beam);
        this.beam.setGravityY(-g);
        this.beam.setSize(6400,64);
        this.beam.anims.create({
            key: 'beamAnim',
            frames: this.anims.generateFrameNumbers('beamSpritesheet', { frames: [0,1,2,3] }),
            frameRate: 16
        })

        // Le denial ne traverse pas le sol
        this.scene.physics.add.collider(this, this.scene.platforms); 
        // Le laser tue le player au contact
        this.scene.physics.add.overlap(this.beam, this.scene.player, () => {
            if (this.on) {
                this.scene.player.die();
                this.stop(); // Empêche le laser de tuer à chaque frame
            }
        });


        // Le denial peut potetiellement utiliser toutes les animations du chara, et joue l'idle par défaut

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [0, 0, 10, 10] }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [0, 0, 0, 0] }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [1, 2, 3] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'jumpPeak',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [4, 5, 6, 7, 8] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'jumpDown',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [8] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'touchGround',
            frames: this.anims.generateFrameNumbers('denialSlimeSheet', { frames: [9, 9, 9] }),
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [8] }),
            frameRate: 1,
            repeat: 0
        })

        this.play('idle');

        console.log('Denial construit');
    }

    // Set le flip de l'objet à l'opposé du flip donné
    setAsFlipped(flip) {
        this.flipX = (flip - 1) ** 2;
    }

    // Le denial s'éteint, et s'en va, mais son laser reste en place
    stop() {
        this.on = false;
        this.y = -64;
        this.setGravityY(-g);
    }

    // Le denial s'éteint, et son laser part avec lui
    kill() {
        this.on = false;
        this.y = -64;
        this.beam.y = -64;
        this.setGravityY(-g);
    }

    // Le denial se rallume et se remet en position
    restart() {
        this.on = true;
        this.y = this.y0;
        this.x = this.x0;
        this.beam.y = -64;
        this.setGravityY(0);
    }

    // Décléché par la jukebox à chaque battement de métronome 
    denialTick(BC) {
        if (this.on) {
            var reducedBC = BC % this.map.length;
            this.beam.play('beamAnim');
            if (this.map[reducedBC] == 1) {  // Si le beat tombe sur un 1 de la beatmap
                // Denial se retourne (par rapport à son flip initial) et tire le laser du bon coté
                this.setAsFlipped(this.initialFlip);
                if (this.initialFlip) {
                    this.beam.setOrigin(0, 0);
                    this.beam.x = this.x + 128 + this.offsetX;
                    this.beam.y = this.y + this.offsetY -32;
                }
                else {
                    this.beam.setOrigin(1, 0);
                    this.beam.x = this.x + this.offsetX;
                    this.beam.y = this.y + this.offsetY-32;
                }
            }
            else { // Sinon elle reprend son orientation initiale et le laser s'en va
                this.setAsFlipped(!this.initialFlip);
                this.beam.x = 0;
                this.beam.y = 0;
            }
        }
    }

    // Permet de tirer un coup de rayon sans passer par le jukebox, identique à tick sans les conditions
    forceTick() {
        if (this.on) {
            this.beam.play('beamAnim');
            this.setAsFlipped(this.initialFlip);
            if (this.initialFlip) {
                this.beam.setOrigin(0, 0);
                this.beam.x = this.x + 128 + this.offsetX;
                this.beam.y = this.y + this.offsetY-32;
            }
            else {
                this.beam.setOrigin(1, 0);
                this.beam.x = this.x + this.offsetX;
                this.beam.y = this.y + this.offsetY-32;
            }
        }
    }

    // ### Déplacements pour cinématiques ###
    // Le denial peut de déplacer avec move en recevant l'argument 'right','left', ou 'immobile' et sauter avec jump en recevant l'argument 'held', ou autre chose 

    move(input) {
        switch (input) {

            case 'right':
                this.setVelocityX(500);
                break;

            case 'left':
                this.setVelocityX(-500);
                break;

            case 'immobile':
                this.setVelocityX(0);
                break;
        }
    }

    jump(input) {
        if (this.body.onFloor()) {
            this.jumpAllowed = true;
        }
        if (input == 'held' && this.jumpAllowed) {
            this.jumpAllowed = false;
            this.setVelocityY(-850);
        }
        // Nuancier
        if (!this.body.blocked.down && input != 'held' && this.body.velocity.y < 0) {
            this.setVelocityY(0);
        }
        // Vitesse terminale
        if (this.body.velocity.y > 600) { 
            this.setVelocityY(500);
        }
    }

    // animate similaire à celle de chara
    animate(input, time) {
        if (!this.body.blocked.down) {
            this.latestInAirTime = time
        }
        if (this.anims.getName() != 'die') {
            if (this.body.velocity.y == 0) {
                if (this.body.blocked.down) {
                    console.log ( 'bloqué') ;
                    if (time - this.latestInAirTime < 125) {
                        this.play('touchGround');
                    }
                    else if (input != 'immobile') {
                        if (true) {
                            this.play('walk', true);
                        }
                    }
                    else {
                        this.play('idle',true);
                    }
                }
                else if (this.scene.denialOnGround) {
                    this.play('walk', true);
                }
                else {
                    this.play('jumpPeak');
                    this.anims.chain('jumpDown');
                }
            }
            else if (this.body.velocity.y == -850) {
                this.play('jumpUp', true);
            }
            else if (this.body.velocity.y > 0) {
                if (this.anims.getName() != 'jumpPeak') {
                    this.play('jumpPeak', true);
                    this.anims.chain('jumpDown');
                }
            }
        }
    }
}
