// Set the score variable
const ScorePanel = document.querySelector('.score');
// Set the lives variables
const LivesPanel = document.querySelector('.lives');
// Create entity class
class Entity{
    constructor(x, y, speed){
       // x axis
        this.x = x;
        // y axis
        this.y = y;
        // Speed of enemies
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Create enemies class
class Enemy extends Entity{
    constructor(x, y, speed){
        super(x, y, speed);
        // Assign the default enemies picture
        this.sprite = 'images/enemy-bug.png';
    }
    /* Update the enemy's position, required method for game
  * Parameter: dt, a time delta between ticks
  * dt parameter multiply any movement  which will ensure the game runs
  * at the same speed for all computers.
  */
    update(dt){
        this.x += this.speed * dt;
  /*
  * When the enemies disappear on the right side of the canvas
  *  they will arise from the left side
  */
        if (this.x > 505) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 200);
        }
        /* When the space between enemies and player is less than 60px
      * on horizontal and 30px on vertical then appears a collision.
      * The player lose a life and reset his position.
      */
        if (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 30 && player.y + 30 > this.y) {
            player.resetPlayer()
            player.lives -= 1;
            gameEnd();
            LivesPanel.innerHTML = player.lives;
        }
    }
}

// Create player class
class Player extends Entity{
    constructor(x , y, score, lives, hidden){
        super(x, y);
        // Assign the boy player picture
        this.sprite = 'images/char-boy.png';
        this.score = 0;
        this.lives = 3;
        LivesPanel.innerHTML = this.lives;
        ScorePanel.innerHTML = this.score;
        this.hidden = false;
    }
    update(dt){
       // Player moves right
        if(this.key === 'right' && this.x < 400){
            this.x += 100;
        }
        // Player moves left
        if(this.key === 'left' && this.x > 2){
            this.x -= 100;
          }
          // Player moves up
        if(this.key === 'up'){
            this.y -= 85;
            // When the player touchs the water resets to start position
         if(this.y < 0){
            this.resetPlayer();
            // Increase the points
            this.score += 1;
            ScorePanel.innerHTML = this.score;
            }
        }
        // Player moves down
        if(this.key === 'down' && this.y < 340){
            this.y += 85;
        }
        this.key = 0;
    }
    render(){
        if(this.hidden == false){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }
    hidePlayer(){
        this.hidden = true;
    }
    handleInput(e){
        this.key = e;
    }
    // Reset position
    resetPlayer(){
        this.x = 202;
        this.y = 404;
        this.hidden = false;
    }
}
// Set the enemies Array
let allEnemies = [];
// Guide the enemies on tracks
const directEnemy = () => {
 allEnemies.push(new Enemy(0, 60));
 allEnemies.push(new Enemy(0, 145));
 allEnemies.push(new Enemy(0, 230));
}
// End of game, when the lives are over
const gameEnd = () => {
if(player.lives <= 0){
    player.hidePlayer();
    player.lives = 0;
    player.score = 0;
    ScorePanel.innerHTML = player.score;
    LivesPanel.innerHTML = player.lives;
    // Alert notification
    swal({
		closeOnEsc: false,
		closeOnClickOutside: false,
		title: 'You lost all your lives!',
		button: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
      startGame();
		}
	})
}
}
// Start new game
const startGame = () => {
    player.lives = 3;
    player.score = 0;
    ScorePanel.innerHTML = player.score;
    LivesPanel.innerHTML = player.lives;
    player.resetPlayer();
}
// Set the player variable
const player = new Player(202, 404);
// call the directEnemy function
directEnemy();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup',(e) => {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
