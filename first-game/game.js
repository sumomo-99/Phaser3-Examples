class mainScene {
    preload(){
        this.canvas = this.sys.game.canvas;
        
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
        Enemy.preload(this);
    }
    
    create() {
        this.gameover = false;
        
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');
        
        this.enemy = new Enemy(this);
        
        this.score = 0;
        const style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        
        this.arrow = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if (!this.gameover) {
            if (this.arrow.right.isDown) {
                this.player.x += 3;
            } else if (this.arrow.left.isDown) {
                this.player.x -= 3;
            }

            if (this.arrow.down.isDown) {
                this.player.y += 3;
            } else if (this.arrow.up.isDown) {
                this.player.y -= 3;
            }
        }
        
        this.enemy.update();
        
        if (this.physics.overlap(this.player, this.coin)) {
            this.hit_coin();
        }
        
        if (this.physics.overlap(this.player, this.enemy.enemy)) {
            this.hit_enemy();
        }
    }

    hit_coin() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        
        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });
    }
    
    hit_enemy() {
        this.gameover = true;
        this.enemy.x_speed = 0;
        this.enemy.y_speed = 0;
    }
}

new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: "arcade" },
    parent: 'game',
});