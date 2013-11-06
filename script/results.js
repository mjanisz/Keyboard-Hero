app.results = new ENGINE.Scene({

	oncreate: function(){
		this.entities = new ENGINE.Collection(this);
	},

	onenter: function(){
		this.entities.add(ENGINE.Static, {
			x: app.width/2,
			y: 265,
			text: "Congratulations! Your result is:",
			onlytext: true,
			opacity: 0,
			offset: 60,
			fadein: true
		});
		this.entities.add(ENGINE.Chain, {
			opacity: 1,
			offset: 0,
			fadeout: true
		});
		this.score = this.entities.add(ENGINE.Score, {
			map: app.assets.sprite("pts").data,
			offset: 190,
			y: 323,
			opacity: 1,
			score: app.score
		});
		var colors = ['orange', 'green', 'red', 'purple'];
		for(var i=0; i<4; i++) {
			this.entities.add(ENGINE.ControlButton, {
				x: i * 100 + 163,
				y: 615,
				map: app.assets.sprite(colors[i]+"-bottom").data,
				color: colors[i],
				fadeout: true,
				opacity: 1
			});
		};
		var letters = ['q', 'w', 'e', 'r'];
		for(var i=0; i<4; i++) {
			this.entities.add(ENGINE.Static, {
				map: app.assets.sprite("button-"+letters[i]).data,
				x: 160+100*i,
				y: 640,
				fadeout: true
			})
		}
		this.restartButton = this.entities.add(ENGINE.Static, {
			map: app.assets.sprite("restart").data,
			fadein: true,
			opacity: 0,
			offset: 20,
			y: app.height/2 + 65
		});
	},

	onstep: function(delta) {
		this.entities.step(delta);
		this.entities.call("step", delta);
	},

	onrender: function(delta){
		app.layer.clear();
		app.layer.drawImage(app.assets.image("bg"), 0, 0);
		this.entities.call("render", delta);
		app.layer.drawImage(app.assets.image("logo"), 42, 18);
	},

  	onmousedown: function(x, y, button) {
  		if((x > this.restartButton.x-this.restartButton.map.frame.w/2 && x < this.restartButton.x+this.restartButton.map.frame.w/2) && (y > this.restartButton.y-this.restartButton.map.frame.h/2 && y < this.restartButton.y+this.restartButton.map.frame.h/2)) {
  			app.selectScene(app.game);
  		}
  	},

  	onleave: function() {
  		this.entities.wipe();
  	}
  
})