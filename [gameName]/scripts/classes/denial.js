class Denial extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x, _y, _key, _flip = false, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        
        super(_scene, _x - 32, _y - 160, _key);

        this.offsetX = 32;
        this.offsetY = 160;

        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setImmovable(true);
        //this.body.setGravity(0, -g);
        this.setOrigin(0, 0);
        // this.setSize(64, 128);
        //this.setSize(350,896);
        //this.setScale(1/7);

        this.setScale(1 / 4)
        this.setSize(64 * 4, 128 * 4);
        this.body.setOffset(64 * 4, 2.5 * 4 * 64);

        this.scene = _scene;

        this.map = _beatMap;
        this.initialFlip = _flip;

        this.x0 = _x-32;
        this.y0 = _y-160;


        this.on = true;

        this.beam = new Phaser.Physics.Arcade.Sprite(_scene, 0, 0, 'beam').setOrigin(0, 0);
        _scene.add.existing(this.beam);
        _scene.physics.add.existing(this.beam);
        this.beam.setGravityY(-g);
        this.beam.setSize(6400,64);

        console.log(this.beam);

        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.overlap(this.beam, this.scene.player, () => {
            if (this.on) {
                this.scene.player.die();
                this.stop();
            }
        });

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

        console.log('denial construit');
        console.log(this.x);
        console.log(this.y);


    }

    flipped(flip) {
        return (flip - 1) ** 2;
    }

    flip() {
        this.flipX = this.flipped(this.flip);
    }

    setAsFlipped(flip) {
        this.flipX = (flip - 1) ** 2;
    }

    stop() {
        this.on = false;
        this.y = -64;
        //        this.beam.y = -64;
        this.setGravityY(-g);
    }

    kill() {
        this.on = false;
        this.y = -64;
        this.beam.y = -64;
        this.setGravityY(-g);
    }

    restart() {
        this.on = true;
        this.y = this.y0;
        this.x = this.x0;
        this.beam.y = -64;
        this.setGravityY(0);
        console.log(this.x);
        console.log(this.y);

    }

    denialTick(BC) {
        if (this.on) {
            var reducedBC = BC % this.map.length;
            if (this.map[reducedBC] == 1) {
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
            else {
                this.setAsFlipped(!this.initialFlip);
                this.beam.x = 0;
                this.beam.y = 0;
            }
        }
    }

    forceTick() {
        // this.x = this.x0;
        // this.y = this.y0;
        if (this.on) {
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
        if (!this.body.blocked.down && input != 'held' && this.body.velocity.y < 0) {
            this.setVelocityY(0);
        }
        if (this.body.velocity.y > 600) { // Vitesse terminale
            this.setVelocityY(500);
        }
    }

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
