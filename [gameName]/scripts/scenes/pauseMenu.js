class PauseMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'PauseMenu',
        })
        console.log('Pause menu contruit');

        
    }

    resumeGame() {
        let musicScene = this.scene.get('MusicAndData');
        musicScene.scene.resume();
        musicScene.jukebox.currMusic.resume();
        musicScene.levelScene.scene.resume();
        musicScene.pauseMusic.stop();
        this.scene.sleep();
    }

    endGame() {
        let musicScene = this.scene.get('MusicAndData');
        musicScene.scene.stop();
        musicScene.levelScene.scene.stop();
        this.scene.run('StartScreen');
        musicScene.pauseMusic.stop();
        this.scene.sleep();
    }

    preload() { }

    create() {
        this.add.image(1920 / 2, 1080 / 2, 'pause');
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        console.log(this.scene.get('MusicAndData').jukebox.timer.getElapsed())
        if (this.keyP.isDown) {
            this.resumeGame();
        }
        else if (this.keySpace.isDown) {
            this.endGame();
        }
    }
}   