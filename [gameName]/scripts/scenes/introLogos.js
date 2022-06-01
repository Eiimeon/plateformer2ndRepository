/*##################################################################################################################################################
Classe : IntroLogos

La première scène. Elle montre les logos, avec des effets de camera, puis lance lance l'écran titre
##################################################################################################################################################*/
class IntroLogos extends Phaser.Scene {
    constructor() {
        super({
            key: 'IntroLogos',
        })

    }

    preload() {
        this.load.image('eimeonXEtpa', 'assets/images/eimeonXEtpa.png')
    }

    create() {
        this.add.image(0, 0, 'eimeonXEtpa').setOrigin(0, 0).setScale(1);

        // Fade in 4s → wait 2s → fade out 2s → StartScreen
        this.cameras.main.fadeIn(4000);

        this.cameras.main.once('camerafadeincomplete', (camera) => {
            this.time.addEvent({
                delay: 2000, callbackScope: this, callback: () => {
                    camera.fadeOut(2000);
                }
            })
        });

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('StartScreen');
        });


    }

    update() { }
}   