class IntroLogos extends Phaser.Scene {
    constructor() {
        super({
            key: 'IntroLogos',
        })

    }

    preload() {
        this.load.image('sojuXEtpa', 'assets/images/sojuXEtpa.png')
    }

    create() {
        this.add.image(0, 0, 'sojuXEtpa').setOrigin(0, 0).setScale(1);

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