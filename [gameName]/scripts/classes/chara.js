/*##################################################################################################################################################
Classe : Personnage

L'objet contrôlé par le joueur
##################################################################################################################################################*/
class Chara extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x = 64, _y = 64, _keyCache) {
        // On construit un sprite et on l'ajoute à la scène
        super(_scene, _x, _y, _keyCache);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        // Le personnage mesure 774 x 1554. Il faut le resize et repositionner son body. Après coup son body mesure 64 x 128
        this.setScale(1 / 4)
        this.setSize(64 * 4, 128 * 4);
        this.body.setOffset(64 * 4, 2.5 * 4 * 64);

        // On garde la scène en mémoire
        this.scene = _scene;

        // Flags
        this.jumpAllowed = true; // Conditionne le saut, devient vrai quand le body du personnage est onFloor()
        this.jumpKeyReleased = true; // Conditionne le saut, devient vrai quand le touches de saut ne sont pas enfoncées. Empêche de ressauter automatiquement si on laisse la touche enfoncée
        this.latestJumpTime; // Le dernier instant auquel le personnage a touché le sol. Permet de définir un saut minimal 
        this.latestInAirTime; // Le dernier instant auquel le personnage ne touchait pas le sol. Permet l'animation d'écrasement à la retombée au sol
        this.dead; // Empêche le personnage de mourrir en boucle pendant son animation de mort

        // Paramètres
        this.runSpeed = 500;
        this.jumpSpeed = 850;

        // Définition des animations
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [10, 10, 0, 0] }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [0, 0, 10, 10] }),
            frameRate: 4,
            repeat: -1
        })

        // Animation de décollage + envol
        this.anims.create({
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [1, 2, 3] }),
            frameRate: 16,
        })

        // Animation de stabilisation en sommet de saut
        this.anims.create({
            key: 'jumpPeak',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [4, 5, 6, 7, 8] }),
            frameRate: 16,
        })

        // Frame de chute
        this.anims.create({
            key: 'jumpDown',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [8] }),
            frameRate: 16,
        })

        // Frame écrasée au sol
        this.anims.create({
            key: 'touchGround',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [9, 9, 9] }),
            frameRate: 1,
            repeat: 0
        })

        // La même frame que jumpDown, mais avec un autre nom, pour la sémantique et au cas où on veuille dessiner une véritable animation de mort 
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [8] }),
            frameRate: 1,
            repeat: 0
        })
    }

    // Déplacements gauche droite basiques
    // Fonctionne avec ←→ et qd
    move(cursors, Q, D) {
        if ((cursors.left.isDown || Q.isDown) && this.body.velocity.x > -this.runSpeed) {
            this.setVelocityX(-this.runSpeed);
            this.flipX = true;
        }
        else if ((cursors.right.isDown || D.isDown) && this.body.velocity.x < this.runSpeed) {
            this.setVelocityX(this.runSpeed);
            this.flipX = false;
        }
        else if ((!(cursors.left.isDown || Q.isDown) && !(cursors.right.isDown || D.isDown))) {
            this.setVelocityX(0);
        }
    }

    // Saut avec nuancier à la MeatBoy (hold to jump higher, fall when you realease)
    // Fonctionne avec ↑ et espace
    jump(keySpace, cursors, time) {

        // Redonne l'autorisation de sauter quand on est au sol
        // La condition this.jumpKeyRealeased empêche de récupérer immédiatement l'autorisation sur les machines rapides sur lesquelles on prend plusieurs frames à quitter le sol
        if (this.body.onFloor() && this.jumpKeyReleased) {
            this.jumpAllowed = true;
        }
        // Le saut est conditionné par l'autorisation et la touche relâchée
        if ((keySpace.isDown || cursors.up.isDown) && this.jumpAllowed && this.jumpKeyReleased) {
            this.play('jumpUp', false); // C'est la seule animation jouée hors de la méthode dédiée. Pourrait sûrement être réglé avec plus de temps.

            // On désactive les autorisations, et on note la date (pour le saut minimal)
            this.jumpAllowed = false;
            this.jumpKeyReleased = false;
            this.latestJumpTime = time;
            // Puis on saute vraiment
            this.setVelocityY(-this.jumpSpeed);
        }

        // Nuancier et saut minimal :
        // Si on est en train de monter sans touche de saut enfoncée, on commence immédiatement à tomber
        // Mais seulement si notre dernier saut était il y a plus de 150ms ce qui donne un saut minimal équivalent à un saut avec 150ms de pression de la touche
        if (!this.body.blocked.down && !(keySpace.isDown || cursors.up.isDown) && this.body.velocity.y < 0) {
            if (time - this.latestJumpTime > 150) {
                this.setVelocityY(0);
            }
        }

        // Vitesse terminale 
        if (this.body.velocity.y > 600) {
            this.setVelocityY(600);
        }
    }


    // La méthode qui régit l'animation du personnage
    animate(cursors, time) {
        // Garde en mémoire la dernière date en l'air
        if (!this.body.blocked.down) {
            this.latestInAirTime = time
        }
        // La mort est prio sur le reste
        if (this.anims.getName() != 'die') {
            // Dicrimination en fonction des vitesses verticales
            if (this.body.velocity.y == 0) {
                if (this.body.onFloor()) {
                    // Au sol :
                    // - Depuis pas longtemps : écrasée
                    // - Et je me déplace : marche
                    // - Sinon : idle
                    if (time - this.latestInAirTime < 125) {
                        this.play('touchGround');
                    }
                    else if ((cursors.left.isDown || cursors.right.isDown)) {
                        if (true) {
                            this.play('walk', true);
                        }
                    }
                    else {
                        this.play('idle', true);
                    }
                }
            }
            else if (this.body.velocity.y > 0) {
                if (this.anims.getName() != 'jumpPeak') {
                    this.play('jumpPeak', true);
                    this.anims.chain('jumpDown');
                }
            }
            // Le cas =< 0 est géré dans jump
        }
    }

    // Déclenchée à la mort du personnage
    die() {
        // La mort se déroule en deux parties, pour laisser un temps de réalisation
        if (!this.dead) {
            this.scene.sound.play('moan');
            this.dead = true;
            console.log('Dies')
            this.play('die');
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.scene.time.addEvent({ delay: 500, callbackScope: this, callback: this.diePt2 });
        }
    }

    // Déclenchée 500ms après la première partie
    diePt2() {
        this.play('idle');
        this.x = this.scene.spawns[0].x - 64;
        this.y = this.scene.spawns[0].y - 3 * 64;

        this.scene.cameras.main.fadeIn(1000); // Ajoute de la douceur
        this.dead = false;

        // S'il y a une denial dans la scène, elle est réinitialisée
        try {
            this.scene.denial.kill();
            this.scene.denial.restart();
        }
        catch (error) { };
    }

    // A mettre dans l'update de la scène, retore certaines choses (actuellement plus grand chose)
    restoreAbilities() {
        if (this.scene.keySpace.isUp && this.scene.cursors.up.isUp) {
            this.jumpKeyReleased = true;
        }
    }
}