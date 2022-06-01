/*##################################################################################################################################################
Classe : RythmeMover

Un des scripts de déplacement d'objets en rythme. Celui ci fait bouger un objet qui existe, contrairement aux objets rythmplat qui se font bouger eux mêmes
On appelera par abus l'objet déplacé par le rythm mover une rythmplat. Dans les faits les rythmMovers agissent sur des layers de plateformes.
##################################################################################################################################################*/
class RythmMover {

    // Requiert l'objet à déplacer 
    constructor(rythmPlat, beatMap = [1]) {
        this.plat = rythmPlat;
        //console.log(this.plat);
        this.map = beatMap;

    }

    // La méthode qui fait bouger. 3 est un artéfact
    // BC est est le beatcount du jukebox
    tick3(BC) {
        var reducedBC = BC % this.map.length;


        if (this.map[reducedBC] == 1) {
            //console.log('beatIn') ;
            this.plat.x = 0;
        }
        if (this.map[reducedBC] == 0) {
            //console.log('beatOut') ;
            this.plat.x = - 6400;
        }
    }
}