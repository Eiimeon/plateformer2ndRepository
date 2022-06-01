/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
happy!, plateformer de fin de première année.

Ce script contient la config du jeu ainsi que quelques constantes utilitaires.

##################################################################################################################################################*/

const g = 1500; // La gravité unique dans tous les niveaux
const STARTLEVELINDEX = 0; // L'indice dans LEVELORDER de la première scène à jouer. Utile pour développement, devrait toujours être 0 dans une version livrée.
const LEVELORDER = ['0', '1', '2', '3', '4', '5', '9', '7', '8']; // Donne l'ordre dans lequel jouer les scènes dont le nom commence par 'L1_'.
                                                                  // Permet de facilement changer l'ordre ou d'ajouter une nouvelle scène comme 'L1_4,5' par exemple.

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT // Permet au canvas de se déformer pour occuper le maximum d'espace disponible dans son parent HTML, sans modifier le ratio.
    },
    scene: [
        // Pour la description de chaque scène cf leur script respectif.
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
        L1_7,
        L1_8,
        L1_9,
    ],
};

var game = new Phaser.Game(config); // La var stockant le jeu. Ne peut pas être une constante à cause de restartGame

// Une fonction pour rédémarer le jeu
// Pas la façon la moins vorace, mais assure qu'il ne reste pas d'artéfacts lorsqu'on relance la partie.
function restartGame() {
    game.destroy(true);
    game = new Phaser.Game(config);
}

// Une coube de Lissajou pour l'effet camera FPS respiration
function lissajousCurve(time) {
    var delta = Math.PI / 2;
    return (new Phaser.Math.Vector2(Math.sin(1 * time + delta), Math.sin(2 * time)));
}