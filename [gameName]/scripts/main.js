/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de fin de première année



##################################################################################################################################################*/
const g = 1500;
// const STARTLEVELKEY = 'L1_6';
const STARTLEVELINDEX = 0;
const LEVELORDER = ['0', '1', '2', '3', '4', '5', '9', '7', '8'];
const NLEVELS1PARTS = 7;

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [
        // IntroLogos,
        StartScreen,
        PauseMenu,
        MusicAndData,
        EndScene,
        L1_0,
        L1_1,
        L1_2,
        L1_3,
        L1_4,
        L1_5,
        L1_6,
        L1_7,
        L1_8,
        L1_9,
        Level1,
        Gym
    ],
    audio: {
        disableWebAudio: false
    }
};

var game = new Phaser.Game(config);

function restartGame() {
    game.destroy(true);
    game = new Phaser.Game(config);
}

// Une coube de Lissajou pour l'effet camera FPS respiration
function lissajousCurve(time) {
    var delta = Math.PI / 2;
    return (new Phaser.Math.Vector2(Math.sin(1 * time + delta), Math.sin(2 * time)));
}