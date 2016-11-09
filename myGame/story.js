/*global game Phaser game_state*/
game_state.story = function() {};

game_state.story.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('snowman2', 'assets/snowman2.png', 144, 144);
        // game.load.image('sun', 'assets/sun.png');

    },
    create: function() {
        // a simple background for our game
        game.add.sprite(0, 0, 'sky');

        //the platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //we will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        //here we create the ground. 
        var ground = this.platforms.create(0, game.world.height - 34, 'ground');
        // game.debug.body(ground);

        //scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //this stops it from falling away when you jump on it
        ground.body.immovable = true;

        //the this.player and its settings
        this.player = game.add.sprite(302, game.world.height - 151, 'snowman2');

        //the story
        this.storyText = game.add.text(16, 16, "Hi, I'm Shan the Snowman. Help me collect \nmore snowflakes so that I don't melt! \nClick to start.", {
            fontSize: '32px',
            fill: 'aliceblue'
        
        // var sun = this.sun.create(730, 50, 'sun');

        });
    },

    update: function() {
addEventListener("click", function(){
    game.state.start('main');
});
 

    }
}

game.state.add('story', game_state.story);
game.state.start('story');
