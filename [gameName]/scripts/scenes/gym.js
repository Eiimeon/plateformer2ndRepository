class Gym extends levelScene {

    constructor() {
        super({
            key: 'Gym',
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
        const MAP = this.make.tilemap({ key: 'gym' });
        const TILESET = MAP.addTilesetImage('tilesetProto', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time) {
        this.standardUpdate(time);
    }

}