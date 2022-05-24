class PauseMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'PauseMenu',
        })
    }



    preload() { }

    create() {
        this.add.image(1920 / 2, 1080 / 2, 'pause');
        this.controls = this.add.image(1920 / 2, 1080 / 2, 'controls');
        this.controls.setVisible(false);
        this.showingControls = false;

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.canPressP = false;
        this.time.addEvent({
            delay: 500, callback: () => {
                this.canPressP = true;
            }
        })
    }

    update(time) {
        console.log(this.canPressP)
        if (this.showingControls) {
            if (this.keyP.isDown) {
                this.canPressP = false;
                this.time.addEvent({
                    delay: 500, callback: () => {
                        this.canPressP = true;
                    }
                })
                this.showingControls = false;
                this.controls.setVisible(false);
            }
        }
        else {
            if (this.keyP.isDown && this.canPressP) {
                this.resumeGame();
            }
            else if (this.keyQ.isDown) {
                restartGame();
            }
            else if (this.keyC.isDown) {
                this.canPressP = false;
                this.time.addEvent({
                    delay: 500, callback: () => {
                        this.canPressP = true;
                    }
                })
                this.showingControls = true;
                this.controls.setVisible(true);
            }
        }
    }

    resumeGame() {
        let musicScene = this.scene.get('MusicAndData');
        musicScene.scene.resume();
        musicScene.jukebox.currMusic.resume();
        musicScene.levelScene.scene.resume();
        musicScene.pauseMusic.stop();
        this.scene.sleep();
    }
}   