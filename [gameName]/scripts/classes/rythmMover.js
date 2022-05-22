class RythmMover {

    constructor(rythmPlat, beatMap = [1]) {
        this.plat = rythmPlat;
        //console.log(this.plat);
        this.map = beatMap;

    }

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
        //console.log('Player : ' + this.player.x + ' , ' + this.player.y ) ;
        //console.log('Player : ' + this.plat.x + ' , ' + this.plat.y ) ;
        //console.log((this.player.x > this.plat.x * 64 + 16) && (this.player.x < this.plat.x*64 -16) && (this.player.y > this.plat.y * 64 + 16) && (this.player.y < this.plat.y*64 -16)) ;
        /*if ((this.plat.x > this.player.x * 64 + 16) && (this.player.x < this.plat.x * 64 - 16) && (this.player.y > this.plat.y * 64 + 16) && (this.player.y < this.plat.y * 64 - 16)) {
            this.player.die();
        }*/
    }
}