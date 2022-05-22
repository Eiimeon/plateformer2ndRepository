class L1_9 extends levelScene {

    constructor() {
        super({
            key: 'L1_9',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_9' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}