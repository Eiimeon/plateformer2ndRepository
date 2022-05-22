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

        this.musicScene.overlay1_9 = this.musicScene.add.image(0,0,'fond1_9').setOrigin(0,0);
        // console.log(this.musicScene);
        // this.musicScene.add.image(0,0,'overlay1_9').setOrigin(0,0);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}