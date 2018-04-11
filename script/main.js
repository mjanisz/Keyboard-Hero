/*
  This file initializes external assets and directs the user to
  the intro scene
 */
var app = new ENGINE.Application({

  /* get width and height of a window */
  width: 632,
  height: 660,

  /* declare all external assets here */
  oncreate: function() {  
	this.assets.addSprites("sprites.png", this.sprites.fetch('buttons'));
	this.assets.addImage("bg.jpg");
	this.assets.addImage("logo.png");
  this.assets.addAudio("unicorn.mp3");
  this.assets.addAudio("standbyme.mp3");
  this.assets.addAudio("lostinfire.mp3");
  this.assets.addAudio("foolmeonce.mp3");
  this.assets.addAudio("glasstable.mp3");
  this.assets.addAudio("childrenof.mp3");
  this.assets.addAudio("mothersson.mp3");
  this.assets.addAudio("newworld.mp3");
  this.assets.addAudio("trumpofdoom.mp3");
  this.assets.addAudio("dondraper.mp3");
  this.assets.addAudio("breakingbad.mp3");
  this.assets.addAudio("newworldremix.mp3");
	console.log(this)
  },

  /* and when the assets are loaded select the game screen */
  onready: function() {
	this.layer.drawImage(this.assets.image("bg"), 0, 0);
	this.selectScene(this.intro);
  }

});
