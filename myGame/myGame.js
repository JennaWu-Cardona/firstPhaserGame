/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};


game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/snowbackground2.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('snowflake', 'assets/snowflake.png');
        game.load.spritesheet('snowman2', 'assets/snowman2.png', 144, 144);
        game.load.image('sun', 'assets/sun.png');
        // game.load.image('snowbackground', 'snowbackground.jpg');
    },


    create: function() {
        // we're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //the platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //we will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        //here we create the ground. 
        var ground = this.platforms.create(0, game.world.height - 34, 'ground');
        // game.debug.body(ground);

        // var sun = this.sun.create(730, 50, 'sun');

        //scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //this stops it from falling away when you jump on it
        ground.body.immovable = true;

        // now let's create two ledges
        var ledge = this.platforms.create(60, 230, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.5, 1);
        var ledge = this.platforms.create(400, 160, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.5, 1);
        var ledge = this.platforms.create(730, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.2, 1);


        //the this.player and its settings
        this.player = game.add.sprite(302, game.world.height - 151, 'snowman2');

        //we need to enable physics on this.player
        game.physics.arcade.enable(this.player);

        //player physics properties. give the little guy a slight bounce
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 230;
        this.player.body.collideWorldBounds = true;

        //Our two animations, walking right and left
        this.player.animations.add('left', [1, 2, 3, 4], 100, true);
        this.player.animations.add('right', [6, 5, 8, 7], 100, true);

        //this makes the snowman the size that I want
        this.player.scale.setTo(0.7, 0.7);
        this.player.body.setSize(74, 114, 23, 13);
        // this.player.body.setSize(84, 114, 20, 13);

        //our controls
        this.cursors = game.input.keyboard.createCursorKeys();

        //finally some this.snowflake to collect
        this.snowflakes = game.add.group();

        //we will enable physics for any snowflake that is created in this group
        this.snowflakes.enableBody = true;

        // here we'll create 15 of them evenly spaced apart
        for (var i = 0; i < 18; i++) {
            //create a snowflake inside of the 'this.snowflake' group
            this.snowflake = this.snowflakes.create(i * 55, 0, 'snowflake');

            this.snowflake.scale.setTo(0.5, 0.5);
            // this.snowflake.body.setSize();

            //let gravity do its thing
            this.snowflake.body.gravity.y = 200;

            //this just gives each snowflake a slightly random bounce value
            this.snowflake.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        //the this.score
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: 'aliceblue'
        });
        this.score = 0;

        },


    update: function() {
        //collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);

        //collide the snowflake and the platforms
        game.physics.arcade.collide(this.snowflakes, this.platforms);

        //checks to see if the this.player overlaps with any of the this.snowflake, if he does call the collectSnowflake function
        game.physics.arcade.overlap(this.player, this.snowflakes, this.collectSnowflake, null, this);

        //reset the this.players velocity (movement)
        this.player.body.velocity.x = 0;

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
            this.player.frame = 0;
        }

        //allow this.player to jump if they are touching the ground. 
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        // game.debug.body(this.player);
        // game.debug.body(this.snowflake);
        
        if (this.score === 2) {
            game.add.text(230, 50, 'Yay! Thanks for making me not\nmelt by catching the snowflakes!', {
                fontSize: '32px',
                fill: 'aliceblue'
        // this.player.scale.setTo(0.9, 0.9);
        // this.player.body.setSize(74, 114, 23, 13);

            })}
        },

    collectSnowflake: function(player, snowflake) {
        //removes the snowflake from the screen
        snowflake.kill();
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;

        // game.physics.arcade.collide(this.snowflakes, this.platforms);

        //finally some this.snowflake to collect
        // this.snowflakes = game.add.group();

        // here we'll create 15 of them evenly spaced apart
        var i = 0;
        i < 1;
        i++;
        //create a snowflake inside of the 'this.snowflake' group
        this.snowflake = this.snowflakes.create(Math.random() * 800, 0, 'snowflake');
        // this.snowflake = Math.random;

        //we will enable physics for any snowflake that is created in this group
        this.snowflakes.enableBody = true;

        this.snowflake.scale.setTo(0.5, 0.5);
        // this.snowflake.body.setSize();

        //let gravity do its thing
        this.snowflake.body.gravity.y = 200;

        //this just gives each snowflake a slightly random bounce value
        this.snowflake.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
};
game.state.add('main', game_state.main);


// in create
// this.scoreText gmae.add.text(16,16, 'welcome... \r he collects stars)
//fontSize: '32px';
