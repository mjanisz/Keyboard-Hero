/*
  Initial Scene
 */
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

  onmousedown: function(x, y) {
    if(isButtonClicked(x, y, this.startButton)) app.selectScene(app.songselect);
  	},

  onleave: function() {
  	this.entities.wipe();
  }

});