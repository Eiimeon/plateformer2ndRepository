class L1_0 extends levelScene {

    constructor() {
        super({
            key: 'L1_0',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
//                    debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_0' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.add.image(3*64-16,3*64+16,'controlsNoFrame').setOrigin(0).setScale(1/3);

        // this.denial = new Denial(this, 450,500,'denial',true,[0,0,0,1]);

    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}