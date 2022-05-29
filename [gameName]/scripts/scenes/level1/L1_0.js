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

        this.add.image(3*64-16,3*64+2,'controlsNoFrame').setOrigin(0).setScale(1/3);

        this.cameras.main.setZoom(400);
        this.cameras.main.zoomTo(1.2,2000,Phaser.Math.Easing.Quadratic.Out)

        // this.cameras.main.stopFollow();
        // this.cameras.main.scrollX += 20;
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}