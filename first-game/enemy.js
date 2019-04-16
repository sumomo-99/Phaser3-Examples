class Enemy {    
    constructor(self) {
        this.gameCanvas = self.canvas;
        
        this.enemy = self.physics.add.sprite(400, 200, 'enemy');
        this.enemy.setTint('0xff0000');
        this.x_speed = 3;
        this.y_speed = 3;
    }
    
    static preload(self) {
        self.load.image('enemy', 'assets/player.png');
    }
    
    update() {
        let change_move = Phaser.Math.Between(1, 100);
        let c_x, c_y = false;

        if (change_move == 1) {
            c_x = true;
        } else if (change_move == 2) {
            c_y = true;
        }

        if (this.enemy.x >= this.gameCanvas.width || this.enemy.x <= 0 || c_x) {
            this.x_speed *= -1;
        }
        this.enemy.x += this.x_speed;

        if (this.enemy.y >= this.gameCanvas.height || this.enemy.y <= 0 || c_y) {
            this.y_speed *= -1;
        }
        this.enemy.y += this.y_speed;
    }
}