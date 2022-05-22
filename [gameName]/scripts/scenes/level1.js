class Level1 extends levelScene {

    constructor() {
        super({
            key: 'Level1',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1500 },
                    debug: true
                }
            }
        })
    }


    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.jukebox.setLevelScene(this);
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'level1' });
        const TILESET = MAP.addTilesetImage('tilesetProto', 'tileset');
        console.log(MAP);

        this.buildLevel(MAP, TILESET);
    }

    update(time) {
        this.standardUpdate(time);
    }

}