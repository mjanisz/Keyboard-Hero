app.intro = new ENGINE.Scene({

	oncreate: function(){
		this.entities = new ENGINE.Collection(this);
	},

	onenter: function(){
		this.startButton = this.entities.add(ENGINE.Static);
	},

	onrender: function(delta){
		app.layer.clear();
		app.layer.drawImage(app.assets.image("bg"), 0, 0);
		this.entities.call("render", delta);
		app.layer.drawImage(app.assets.image("logo"), 42, 18);
	},

  onmousedown: function(x, y, button) {
  	if((x > this.startButton.x-this.startButton.map.frame.w/2 && x < this.startButton.x+this.startButton.map.frame.w/2) && (y > this.startButton.y-this.startButton.map.frame.h/2 && y < this.startButton.y+this.startButton.map.frame.h/2)) {
  		app.selectScene(app.game);
  	}
  
  },

  onleave: function() {
  	this.entities.wipe();
  }


})