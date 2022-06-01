/*##################################################################################################################################################
Classe : PauseMenu

La scène de pause. Elle est lancée en appuyant p en jeu, et apparait par dessus.
##################################################################################################################################################*/
class PauseMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'PauseMenu',
        })
    }



    preload() { }

    create() {

        // On affiche les deux images, pause et controls, et on rend controls invisible
        this.add.image(1920 / 2, 1080 / 2, 'pause');
        this.controls = this.add.image(1920 / 2, 1080 / 2, 'controls');
        this.controls.setVisible(false);
        this.showingControls = false;

        // On déclare les touches du menu
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        // Mesure pour éviter d'appuyer plusieurs fois sur p en une seule pression
        this.canPressP = false;
        this.time.addEvent({
            delay: 500, callback: () => {
                this.canPressP = true;
            }
        })
    }

    update(time) {
        // Si on voit le controles, p revient en arrière
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
        // Si on ne les voit pas
        else {
            // p revient au jeu
            if (this.keyP.isDown && this.canPressP) {
                this.resumeGame();
            }
            // q quitte le jeu
            else if (this.keyQ.isDown) {
                restartGame();
            }
            // c montre les controles
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

    // Revient au jeu, en enlevant la pause, et remettant la musique etc
    resumeGame() {
        let musicScene = this.scene.get('MusicAndData');
        musicScene.scene.resume();
        musicScene.jukebox.currMusic.resume();
        musicScene.levelScene.scene.resume();
        musicScene.pauseMusic.stop();
        this.scene.sleep();
    }
}   