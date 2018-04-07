/*
  Handles the logic for the game.
 */

app.game = new ENGINE.Scene({

  /* this is actually called immediately as this object is created
     so no assets are ready
  */

	oncreate: function() {
    /* create new collection of entities */

		this.entities = new ENGINE.Collection(this);
		this.notes = new ENGINE.Collection(this);
		this.list = new ENGINE.List();
		this.songManager = new ENGINE.SongManager();
		this.song = "ratatat";
	},

  setSongManagerIndex: function(index)
  {
    this.songManager = new ENGINE.SongManager(
      {
        index: index
      })
  },

  setSong: function(song)
  {
    this.song = song;
  },

  setList: function(list)
  {
    this.list = list;
  },

  /* initiates game */
	onenter: function() {
		var parent = this;
		this.exitEarly = false;
		this.songManager.initSong();
		console.log("getting song " + this.song);
    this.music = app.assets.audio(this.song);
		this.music.play();
		this.score = this.entities.add(ENGINE.Score, {
			map: app.assets.sprite("pts").data 
		});
		this.entities.add(ENGINE.Static, {
			map: app.assets.sprite("line").data,
			offset: 20,
			opacity: 0,
			y: 400,
			offset: 20,
			fadein: true
		});
		this.instruction = this.entities.add(ENGINE.Static, {
			map: app.assets.sprite("instruction").data,
			fadein: true,
			opacity: 0,
			offset: 10
		});
		this.timer = this.entities.add(ENGINE.Static, {
			map: app.assets.sprite("ready").data,
			opacity:0,
			text: "3"
		});
    /*
       There is a bug with exiting a song prematurely caused by the delay function.
       If the player exits the song before the countdown ends, the timing of the music
       notes appearing goes out of whack. The current workaround is to make the back button
       available after this countdown ends.
     */
		this.back = this.entities.add(ENGINE.Static, {
		  map: app.assets.sprite("back").data,
      x: 9.45 / 10 * app.width,
      y: 2.1 / 8 * app.height,
      opacity:0   //set this to 1 if you're debugging and need to exit a song immediately
    });
		this.delayfunction(this.instruction, {
			fadein: false,
			fadeout: true,
			y: app.height/2 + 200,
			offset: 200
		}, 7000);
		for(var i=0; i<4; i++) {
			if(i!=3) {
				this.delayfunction(this.timer, {
					opacity: 1,
					text: 3-i
				}, 8200+i*1000)
			} else {
				this.delayfunction(this.timer, {
					opacity: 0,
				}, 8200+i*1000);

        this.delayfunction(this.back, {
          opacity: 1,
        }, 8200+i*1000);
      }
		};

		this.chain = this.entities.add(ENGINE.Chain);
		parent.orangeControl = this.createControlButton(117 + 46, 615, parent.getColor(0));
		parent.greenControl = this.createControlButton(217 + 46, 615, parent.getColor(1));
		parent.redControl = this.createControlButton(317 + 46, 615, parent.getColor(2));
		parent.purpleControl = this.createControlButton(417 + 46, 615, parent.getColor(3));
		var letters = ['q', 'w', 'e', 'r'];
		for(var i=0; i<4; i++) {
			this.entities.add(ENGINE.Static, {
				map: app.assets.sprite("button-"+letters[i]).data,
				opacity: 0,
				x: 160+100*i,
				y: 640,
				fadein: true
			})
		}
		setTimeout(function(){
			parent.createNote();
		}, 11500)
	},

	delayfunction: function(object, args, time) {
		setTimeout(function(){
			_.extend(object, args);
		}, time)
	},

	createControlButton: function(x,y,color) {
		return this.entities.add(ENGINE.ControlButton, {
			x: x,
			y: y,
			map: app.assets.sprite(color+"-bottom").data,
			color: color,
			hit: this.entities.add(ENGINE.HitButton, {
				x: x,
				y: y,
				map: app.assets.sprite(color+"-hit").data
			})
		});
	},

  checkPress: function (button) {
    button.bounce();
    var isNoteHit = false; //checks if a note was hit at a valid key press

    for (var i = 0; i < 3; i++) {
      if (this.notes[i] && this.notes[i].y > 570 && this.notes[i].y < 620 && this.notes[i].color == button.color) {
        button.hit.makeVisible();
        this.notes[i].remove();
        isNoteHit = true;
        this.score.increase(this.chain.multiplier);
        this.chain.increase();
      }
    }
    if(!isNoteHit)
    {
      this.chain.miss();
    }
  },

	createNote: function() {
		if(this.list.bar < this.list.song.length) {
			var bar = this.list.getNotes(this.list.bar).split("");
			for(n=0; n<4; n++) {
				if(bar[n]==1) {
					this.notes.add(ENGINE.Button, {
						x: 117 + 42 + n*100,
						y: -15*(this.list.bar-this.list.lastBarUsed),
						map: app.assets.sprite(this.getColor(n)).data,
						color: this.getColor(n),
						chain: this.chain
					});
					this.list.barUsed(this.list.bar);
				}
			}
			this.list.nextBar();
		} else if(_.last(this.notes).y >= app.height) {
			app.selectScene(app.results);
		}
	},

	getColor: function(colorCode) {
		var color;
		switch(colorCode) {
			case 0:
				color = 'orange';
				break;
			case 1:
				color ='green';
				break;
			case 2:
				color = 'red';
				break;
			case 3:
				color = 'purple';
				break;
		}
		return color
	},

	onstep: function(delta) {
		if(this.notes.length > 0 && _.last(this.notes).y > 0) {
			this.createNote();
		} else if(this.list.bar == this.list.song.length && this.notes.length == 0) {
			app.selectScene(app.results);
		};
		this.entities.step(delta);
		this.notes.step(delta);   
		this.entities.call("step", delta);
		this.notes.call("step", delta);
	},

	onrender: function(delta) {
			app.layer.clear();
			app.layer.drawImage(app.assets.image("bg"), 0, 0);
			this.entities.call("render", delta);
			this.notes.call("render", delta);
			app.layer.drawImage(app.assets.image("logo"), 42, 18); 
	},

	onkeydown: function(key) {
		if(key == "q") this.checkPress(this.orangeControl);
		if(key == "w") this.checkPress(this.greenControl);
		if(key == "e") this.checkPress(this.redControl);
		if(key == "r") this.checkPress(this.purpleControl);
	},

  onleave: function() {
    app.score = this.score.score;
    this.music.pause();
    this.music.currentTime = 0;
    this.back.opacity = 0;
    this.list.reset();
    this.entities.wipe();
    this.notes.wipe();
  },

  onmousedown: function (x, y) {
	  var button = this.back;
    if (button.opacity == 1 && isButtonClicked(x, y, button))
    {
      app.selectScene(app.songselect);
    }
  }
});
