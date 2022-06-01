/*##################################################################################################################################################
Classe : EndScene

La dernière scène. Elle contient les fins, puis les crédits plus redémarre le jeu
##################################################################################################################################################*/
class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene',
        })
    }

    // Permet de savoir quel trigger a été touché pour lancer la fin, et donc d'afficher la bonne fin
    init(data) {
        this.endIdentifier = data;
        console.log('EndScene construite');
        console.log(data);
    }

    preload() { }

    create() {

        // La touche espace servira à skip les crédits
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Fin de gauche, else fin de droite
        // Les fins sont des successions d'images et de sons gérées par des time events
        // Le plus long déclenche les crédits
        if ( this.endIdentifier == 'gauche') {
            this.add.image(0,0,'fin1_1').setOrigin(0);
            this.time.addEvent({delay : 3000, callbackScope :this , callback : () => {
                this.sound.add('sad').setVolume(0.3).play();
                this.cameras.main.fadeIn(1000);
                this.add.image(0,0,'fin1_2').setOrigin(0);
            }})
            this.time.addEvent({delay : 9000, callbackScope :this , callback : () => {
                this.credits();
            }})
        }
        else {
            this.sound.add('jackNoise').setVolume(0.5).play();
            this.time.addEvent({delay : 2000, callbackScope :this , callback : () => {
                this.add.image(0,0,'fin2').setOrigin(0);
            }})
            
            this.time.addEvent({delay : 7000, callbackScope :this , callback : () => {
                this.sound.add('sad').setVolume(0.3).play();
                this.credits();
            }})
        }
    }

    credits() {
        this.add.image(0,0,'credits').setOrigin(0);
        this.time.addEvent({delay : 83000, callbackScope :this , callback : () => {
            restartGame();
        }})
    }

    update() {
        // Presser espace redémarre immédiatement le jeu
        if (this.keySpace.isDown) {
            restartGame();
        }
    }
}   