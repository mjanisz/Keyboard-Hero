var app = new ENGINE.Application({

  /* get width and height of a window */
  width: 632,
  height: 660,

  oncreate: function() {  
	this.assets.addSprites("sprites.png", this.sprites.fetch('buttons'));
	this.assets.addImage("bg.jpg");
	this.assets.addImage("logo.png");
	this.assets.addAudio("ratatat.mp3");
	console.log(this)
  },

  /* and when the assets are loaded select the game screen */
  onready: function() {
	this.layer.drawImage(this.assets.image("bg"), 0, 0);
	this.selectScene(this.intro);
  }

});
