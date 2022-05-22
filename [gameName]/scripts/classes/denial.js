class Denial extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x, _y, _key, _flip = false, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        super(_scene, _x, _y, _key);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setImmovable(true);
        //this.body.setGravity(0, -g);
        this.setOrigin(0, 0);
        //this.setSize(350,896);
        //this.setScale(1/7);

        this.scene = _scene;

        this.map = _beatMap;
        this.initialFlip = _flip;

        this.x0 = _x;
        this.y0 = _y;
        this.on = true;

        this.beam = new Phaser.Physics.Arcade.Sprite(_scene, 0, 0, 'beam').setOrigin(0, 0);
        _scene.add.existing(this.beam);
        _scene.physics.add.existing(this.beam);
        this.beam.setGravityY(-g);

        console.log(this.beam);

        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.overlap(this.beam, this.scene.player, () => {
            if (this.on) {
                this.scene.player.die();
                this.stop();
            }
        });

        console.log('denial construit')
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
        this.beam.y = -64;
        this.setGravityY(0);
//        this.forceTick();
    }

    denialTick(BC) {
        if (this.on) {
            var reducedBC = BC % this.map.length;
            if (this.map[reducedBC] == 1) {
                this.setAsFlipped(this.initialFlip);
                if (this.initialFlip) {
                    this.beam.setOrigin(0, 0);
                    this.beam.x = this.x + 128;
                    this.beam.y = this.y;
                }
                else {
                    this.beam.setOrigin(1, 0);
                    this.beam.x = this.x;
                    this.beam.y = this.y;
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
        if (this.on) {
            this.setAsFlipped(this.initialFlip);
            if (this.initialFlip) {
                this.beam.setOrigin(0, 0);
                this.beam.x = this.x + 128;
                this.beam.y = this.y;
            }
            else {
                this.beam.setOrigin(1, 0);
                this.beam.x = this.x;
                this.beam.y = this.y;
            }
        }
    }
}
