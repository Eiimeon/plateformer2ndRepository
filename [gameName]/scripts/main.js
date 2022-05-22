/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de fin de première année



##################################################################################################################################################*/
const g = 1500;
const STARTLEVELKEY = 'L1_5';
const NLEVELS1PARTS = 9

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    input: {
        gamepad: true
    },
    scale : {
        mode : Phaser.Scale.FIT
    },
    scene: [
        //IntroLogos,
        StartScreen,
        PauseMenu,
        MusicAndData,
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