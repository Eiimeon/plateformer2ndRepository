class L1_7 extends levelScene {

    constructor() {
        super({
            key: 'L1_7',
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
        const MAP = this.make.tilemap({ key: 'L1_7' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
        console.log(this.denialSpawns[0]);
        this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [1, 1, 0, 0]);

        var _denialTriggers0 = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers0').objects.forEach(function (currTrigger) { _denialTriggers0.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers0 = _denialTriggers0;

        var _denialTriggers1 = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers1').objects.forEach(function (currTrigger) { _denialTriggers1.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers1 = _denialTriggers1;

        var _denialTriggers2 = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers2').objects.forEach(function (currTrigger) { _denialTriggers2.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers2 = _denialTriggers2;

        this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);
        
        this.physics.add.overlap(this.player, this.denialTriggers0, () => {
            // this.denial.x0 = this.denialSpawns[0].x;
            // this.denial.y0 = this.denialSpawns[0].y;
            this.denial.initialFlip = false;
            // console.log(this.denial.x);
        })

        this.physics.add.overlap(this.player, this.denialTriggers1, () => {
            this.denial.body.x = this.denialSpawns[1].x;
            this.denial.body.y = this.denialSpawns[1].y;
            // this.denial.x0= this.denialSpawns[1].x;
            // this.denial.y0 = this.denialSpawns[1].y;
            this.denial.initialFlip = true;
        })

        this.physics.add.overlap(this.player, this.denialTriggers2, () => {
            this.denial.kill();
        })
    }

    update(time, delta) {
        this.standardUpdate(time, delta);
    }

}