var app = new ENGINE.Application({

  width: 632,
  height: 660,

  oncreate: function() {  
	this.assets.addSprites("sprites.png", this.sprites.fetch('buttons'));
	this.assets.addImage("bg.jpg");
	this.assets.addImage("logo.png");
	this.assets.addAudio("ratatat.mp3");
	console.log(this)
  },

  onready: function() {
	this.layer.drawImage(this.assets.image("bg"), 0, 0);
	this.selectScene(this.intro);
  }

});
