/*##################################################################################################################################################
Classe : L1_3

Une scène de niveau. Elle hérite de levelScene.
Ainsi, elle est sur une base extrêmement standardisée. Mais il peut y avoir des ajouts spécifiques
##################################################################################################################################################*/
class L1_3 extends levelScene {

    constructor() {
        super({
            key: 'L1_3',
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
        const MAP = this.make.tilemap({ key: 'L1_3' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}