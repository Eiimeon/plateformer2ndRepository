class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene',
        })
    }

    init(data) {
        this.endIdentifier = data;
        console.log('EndScene construite');
        console.log(data);
    }

    preload() { 
        
    }

    create() {
        if ( this.endIdentifier == 'gauche') {
            this.add.image(0,0,'fin1').setOrigin(0);
            this.time.addEvent({delay : 3000, callbackScope :this , callback : () => {
                this.credits();
            }})
        }
        else {
            this.add.image(0,0,'fin2').setOrigin(0);
            this.time.addEvent({delay : 3000, callbackScope :this , callback : () => {
                this.credits();
            }})
        }
    }

    credits() {
        this.add.image(0,0,'credits').setOrigin(0);
        this.time.addEvent({delay : 3000, callbackScope :this , callback : () => {
            restartGame();
        }})
    }

    update() {
        
    }
}   