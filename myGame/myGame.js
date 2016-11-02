/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },


    create: function() {
        // we're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // a simple background and star for our game
        game.add.sprite(0, 0, 'sky');
        //the platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //we will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        //here we create the ground. 
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');

        //scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //this stops it from falling away when you jump on it
        ground.body.immovable = true;

        // now let's create two ledges
        var ledge = this.platforms.create(50, 100, 'ground');
        ledge.body.immovable = true;
        var ledge = this.platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        //the this.player and its settings
        this.player = game.add.sprite(32, game.world.height - 111, 'dude');

        //we need to enable physics on this.player
        game.physics.arcade.enable(this.player);

        //player physics properties. give the little guy a slight bounce
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 100;
        this.player.body.collideWorldBounds = true;

        //Our two animations, walking right and left
        this.player.animations.add('left', [0, 1, 2, 3], 100, true);
        this.player.animations.add('right', [5, 6, 7, 8], 100, true);

        //our controls
        this.cursors = game.input.keyboard.createCursorKeys();

        //finally some this.stars to collect
        this.stars = game.add.group();

        //we will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        // here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //create a star inside of the 'this.stars' group
            var star = this.stars.create(i * 55, 0, 'star');

            //let gravity do its thing
            star.body.gravity.y = 200;

            //this just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        //the this.score
        this.scoreText = game.add.text(16, 16, 'score:0'+this.score, {
            fontSize: '32px',
            fill: '#000'
        });
    },


    update: function() {


        //collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);

        //collide the stars and the platforms
        game.physics.arcade.collide(this.stars, this.platforms);

        //checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        //reset the this.players velocity (movement)
        this.player.body.velocity.x = 0

        if (this.cursors.left.isDown) {
            //move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else {
            //stand still
            this.player.animations.stop();
            this.player.frame = 10;
        }

        //allow this.player to jump if they are touching the ground. 
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

    },
    collectStar: function(player, star) {
        //removes the star from the screen
        star.kill();
        this.score ++
        this.scoreText.text = 1
    }

}
game.state.add('main', game_state.main);
game.state.start('main');
