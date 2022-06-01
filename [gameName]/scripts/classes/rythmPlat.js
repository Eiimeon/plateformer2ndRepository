/*##################################################################################################################################################
Classe : RythmePlat

Un des scripts de déplacement d'objets en rythme. Celui ci crée de sprites qui bougent eux mêmes, contrairement aux objets rythmMovers qui font bouger des objets existants
Les rythmPlats sont des sprites statiques qui sont soit à leur place, soit loin en fonction de si le beat en cours tombe sur un 1 de leur beatmap
##################################################################################################################################################*/
class RythmPlat extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x, _y, _key, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        super(_scene, _x, _y, _key);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setGravity(0, -g);

        this.map = _beatMap;

        // Positions initialles
        this.x0 = _x;
        this.y0 = _y;
    }

    // La méthode qui fait bouger. 3 est un artéfact
    // BC est est le beatcount du jukebox
    tick3(BC) {
        var reducedBC = BC % this.map.length;

        if (this.map[reducedBC] == 1) {
            //console.log('beatBackwards') ;
            this.x = this.x0;
        }
        if (this.map[reducedBC] == 0) {
            //console.log('beatForward') ;
            this.x = this.x0 - 6400;
        }
    }
}
