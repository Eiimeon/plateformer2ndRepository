/*##################################################################################################################################################
Classe : Personnage
##################################################################################################################################################*/
class Chara extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x = 64, _y = 64, _keyCache) {
        super(_scene, _x, _y, _keyCache);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.setScale(1 / 4)
        this.setSize(64 * 4, 128 * 4);
        this.body.setOffset(64 * 4, 2.5 * 4 * 64);

        // this.setOrigin(0,1);


        this.body.useDamping = true;
        this.friction = 0.001;


        this.scene = _scene;

        // Flags
        this.bumped = false; // Utilisé dans bump,  pour que le nuancier de saut n'affecte pas les rebonds
        this.jumpAllowed = true; // Empêche de pouvoir sauter sur les pêches, false quand on touche un pêche, redevient vrai quand on touche le sol
        this.jumpKeyReleased = true;
        this.latestJumpTime;
        this.latestInAirTime;
        this.dashing = false;
        this.spawnIndex = 0;
        this.dead;

        // Paramètres
        this.runSpeed = 500;
        this.jumpSpeed = 850;
        this.dashSpeed = 1000;
        this.dashDuration = 200;

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

        this.anims.create({
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [1, 2, 3] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'jumpPeak',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [4, 5, 6, 7, 8] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'jumpDown',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [8] }),
            frameRate: 16,
        })

        this.anims.create({
            key: 'touchGround',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [9, 9, 9] }),
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('slimeSheet', { frames: [8] }),
            frameRate: 1,
            repeat: 0
        })
    }

    // Déplacements gauche droite basiques
    move(cursors, keySpace, Q, D) {
        if ((cursors.left.isDown || Q.isDown) && this.body.velocity.x > -this.runSpeed) {
            this.setVelocityX(-this.runSpeed);
            this.flipX = true;
            //Sconsole.log('test') ;
            //this.play('walk') ;
            if (this.body.onFloor()) {

                // this.play('walk') ;
            }
            else {
                // this.play('idle') ;
            }
        }
        else if ((cursors.right.isDown || D.isDown) && this.body.velocity.x < this.runSpeed) {
            this.setVelocityX(this.runSpeed);
            this.flipX = false;
            //console.log('test') ;
            // this.play('walk') ;
            if (this.body.onFloor()) {

                // this.play('walk') ;
            }
            else {
                // this.play('idle') ;
            }
        }
        else if ((!(cursors.left.isDown || Q.isDown) && !(cursors.right.isDown || D.isDown))) {
            this.setVelocityX(0);
            // this.play('idle') ;
            //this.setDragX(this.friction) ;
        }
    }



    // Saut avec nuancier à la MeatBoy, et vitesse terminale pour mieux viser les sauts
    jump(keySpace, cursors, time) {
        if (this.body.onFloor() && this.jumpKeyReleased) {
            this.jumpAllowed = true;
        }
        if ((keySpace.isDown || cursors.up.isDown) && this.jumpAllowed && this.jumpKeyReleased) {
            this.play('jumpUp', false);
            this.jumpAllowed = false;
            this.jumpKeyReleased = false;
            this.latestJumpTime = time;
            // console.log(this.latestJumpTime)
            this.setVelocityY(-this.jumpSpeed);
        }
        if (!this.body.blocked.down && !(keySpace.isDown || cursors.up.isDown) && this.body.velocity.y < 0) {
            if (time - this.latestJumpTime > 150) {
                this.setVelocityY(0);
                // this.jumpAllowed = true;
            }
        }

        if (this.body.velocity.y > 600) { // Vitesse terminale
            this.setVelocityY(500);
        }
    }



    animate(cursors, time) {
        if (!this.body.blocked.down) {
            this.latestInAirTime = time
        }
        if (this.anims.getName() != 'die') {
            if (this.body.velocity.y == 0) {
                if (this.body.onFloor()) {
                    //console.log ( player.anims.getName()) ;

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
                else {
                    this.play('jumpPeak');
                    this.anims.chain('jumpDown');
                }
            }
            else if (this.body.velocity.y < 0) {
                // this.play('jumpUp',false);
            }
            else if (this.body.velocity.y > 0) {
                // this.play('jumpPeak',true);
                if (this.anims.getName() != 'jumpPeak') {
                    this.play('jumpPeak', true);
                    this.anims.chain('jumpDown');
                }
            }
        }
    }


    // Comme un saut, déclenché quand on saute sur un ennemi ou une caisse, désactive le nuancier jusqu'au prochain saut
    bump() {
        this.bumped = true;
        this.setVelocityY(-550);
    }

    die() {
        if (!this.dead) {
            this.scene.sound.play('moan');
            // this.scene.sound.play('deathPiano');
            // if (this.spawnIndex >= this.scene.spawns.length) {
            //     //this.spawnIndex = this.scene.spawns.length - 1 ;
            //     this.spawnIndex = 0;
            // }
            this.dead = true;
            console.log('die')
            //        this.setGravityY(-g);
            this.play('die');
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.scene.time.addEvent({ delay: 500, callbackScope: this, callback: this.diePt2 });

            //Sthis.scene.cameras.main.setBounds(this.scene.screenBounds[this.spawnIndex][0],this.scene.screenBounds[this.spawnIndex][1],this.scene.screenBounds[this.spawnIndex][2],this.scene.screenBounds[this.spawnIndex][3]) ; // Empêche de voir sous le sol notamment
            // this.scene.scene.restart();
        }
    }

    diePt2() {
        this.setGravityY(0);
        this.play('idle');
        this.x = this.scene.spawns[this.spawnIndex].x - 64;
        this.y = this.scene.spawns[this.spawnIndex].y - 3 * 64;

        this.scene.cameras.main.fadeIn(1000);
        this.dead = false;

        try {
            this.scene.denial.kill();
            this.scene.denial.restart();
        }
        catch (error) { };
    }


    restoreAbilities() {
        // console.log(this.anims.getName());
        console.log(this.jumpAllowed);
        if (this.body.onFloor()) {
            // this.jumpAllowed = true;
        }
        if (this.scene.keySpace.isUp) {
            this.jumpKeyReleased = true;
        }
    }
}