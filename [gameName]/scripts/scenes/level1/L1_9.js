/*##################################################################################################################################################
Classe : L1_8

Une scène de niveau. Elle hérite de levelScene.
Ainsi, elle est sur une base extrêmement standardisée. Mais il peut y avoir des ajouts spécifiques
C'est la scène standard avec Denial
##################################################################################################################################################*/
class L1_9 extends levelScene {

    constructor() {
        super({
            key: 'L1_9',
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
        const MAP = this.make.tilemap({ key: 'L1_9' });
        const TILESET = MAP.addTilesetImage('tilesetFinal', 'tileset');

        this.buildLevel(MAP, TILESET);

        // On spawn la Denial avec ses triggers de désapparition
        this.denialSpawns = MAP.getObjectLayer('denialSpawns').objects
        console.log(this.denialSpawns[0]);
        this.denial = new Denial(this, this.denialSpawns[0].x, this.denialSpawns[0].y, 'denial', false, [0, 0, 0, 1]);


        var _denialTriggers = this.physics.add.group({ allowGravity: false, immovable: true });
        MAP.getObjectLayer('denialTriggers').objects.forEach(function (currTrigger) { _denialTriggers.create(currTrigger.x, currTrigger.y - 64, 'transparent').setOrigin(0); });
        this.denialTriggers = _denialTriggers;

        this.physics.add.overlap(this.player, this.denialTriggers, () => {
            this.denial.kill();
        })

        // La filtre présent sur toutes les scènes à partir de 1_5
        this.add.image(0, 0, 'blueFilter').setOrigin(0).setScrollFactor(0);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}