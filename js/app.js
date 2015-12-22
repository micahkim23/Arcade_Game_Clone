// Enemies our player must avoid
var constants = {
    'MAX_YPOS': 300,
    'MAX_XPOS': 300,
    'MIN_YPOS': 140,
    'MIN_XPOS': 100,
    'CANVAS_WIDTH': 505,
    'START_XPOS': 200,
    'START_YPOS': 380
};

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //possible y positions for enemy
    var yPos = [60, 140, 230];
    if (this.x + dt*this.speed < constants.CANVAS_WIDTH) {
        this.x = this.x + dt*this.speed;
    }
    else {
        this.x = -150;
        this.y = yPos[Math.floor(Math.random()*3)];
    }
    // checks collision between enemy and player
    if (this.x >= player.x - 50 && this.x <= player.x + 50 && this.y >= player.y - 60 && this.y <= player.y + 20) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = constants.START_XPOS; 
    this.y = constants.START_YPOS; 
};

Player.prototype.update = function() {
    this.xNow = this.x;
    this.yNow = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// moves player in given direction
Player.prototype.handleInput = function(dir) {
    if (dir === 'left' && this.x >= constants.MIN_XPOS) {
        this.x = this.xNow - 100;
    }
    else if (dir === 'up') {
        // resets player if player reaches water
        if (this.y < constants.MIN_YPOS) {
            this.reset();
        }
        else if (this.y >= constants.MIN_YPOS) {
            this.y = this.yNow - 80;
        }
    }
    else if (dir === 'right' && this.x <= constants.MAX_XPOS) {
        this.x = this.xNow + 100;
    }
    else if (dir === 'down' && this.y <= constants.MAX_YPOS) {
        this.y = this.yNow + 80;
    }
};

// resets player to initial start position
Player.prototype.reset = function() {
    this.x = constants.START_XPOS;
    this.y = constants.START_YPOS;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-150, 60, 200);
var enemy2 = new Enemy(-150, 140, 300);
var enemy3 = new Enemy(-150, 230, 250);
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
