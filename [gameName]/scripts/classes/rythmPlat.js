class RythmPlat extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x, _y, _key, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        super(_scene, _x, _y, _key);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setGravity(0, -g);

        this.beatCount = 0;
        this.map = _beatMap;

        this.x0 = _x;
        this.y0 = _y;

        //console.log(this.x0) ;

    }

    incBeat() {
        this.beatCount += 1;
        this.beatCount = this.beatCount % this.map.length;
        //console.log(this.beatCount) ; 
        this.tick();
    }


    tick() {
        //this.setX(this.map[this.beatCount] * 5*64 + (1 - this.map[this.beatCount]) * 64) ;

        this.incX((2 * this.map[this.beatCount] - 1) * 4 * 64);
        this.refresh();
    }

    tick2(BC) {

        var reducedBC = BC % this.map.length;

        //this.setX(this.map[this.beatCount] * 5*64 + (1 - this.map[this.beatCount]) * 64) ;

        //this.incX((2*this.map[reducedBC]-1)*4*64) ;

        console.log(this.map)

        if (this.map[reducedBC] == 1) {
            this.incX(64);
        }
        if (this.map[reducedBC] == -1) {
            this.incX(-64);
        }

        this.refresh();
    }

    tick3(BC) {
        var reducedBC = BC % this.map.length;

        if (this.map[reducedBC] == 1) {
            //console.log('beatBackwards') ;
            this.x = this.x0;
        }
        if (this.map[reducedBC] == 0) {
            //console.log('beatForward') ;
            this.x = this.x0 - 6400;
        }
    }
}
