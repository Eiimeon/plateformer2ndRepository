class Vector {

    constructor (array = new Array) {
        this.data = array
    }

    add(otherVector) {
        for ( var i = 0 ; i<this.data.length ; i++ ) {
            this.data[i] += otherVector.data[i] ;
        }
    }

    timesScalar(scalar) {
        for ( var i = 0 ; i<this.data.length ; i++ ) {
            this.data[i]*= scalar ;
        }
    }

    norm() {
        var norm = 0 ;
        for ( var i = 0 ; i<this.data.length ; i++ ) {
            norm += (this.data[i])**2 ;
        }
        norm = Math.sqrt(norm) ;
        return(norm)
    }

    normalize() { // Normalise un vecteur non nul
        var N = this.norm() ;
        if ( N != 0 ) {
            this.timesScalar(1/N) ;
        }
    }
}