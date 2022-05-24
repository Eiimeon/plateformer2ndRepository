class L1_6 extends levelScene {

    constructor() {
        super({
            key: 'L1_6',
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
        const MAP = this.make.tilemap({ key: 'L1_6' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
        console.log(this.denialSpawns[0]);
        this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 1, 1]);

        var _denialTriggers = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers').objects.forEach(function (currTrigger) { _denialTriggers.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers = _denialTriggers;

        this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);

        this.physics.add.overlap(this.player, this.denialTriggers, () => {
            this.denial.kill();
        })
    }

    update(time, delta) {
        this.standardUpdate(time, delta);
    }

}