app.songselect = new ENGINE.Scene({

  oncreate: function(){
    this.entities = new ENGINE.Collection(this);

    this.w = app.width;
    this.h = app.height;

    this.songNumbers = [this.songOne, this.songTwo, this.songThree, this.songFour, this.songFive, this.songSix, this.songSeven, this.songEight,
      this.songNine, this.songTen, this.songEleven, this.songTwelve, this.songThirteen, this.songFourteen,];
  },

  onenter: function(){
    console.log("songselect on enter called");
    var count = 1;
    var wMultiplier = 1;
    var yMultiplier = 1;

    for (var number in this.songNumbers)
    {
      number = this.entities.add(ENGINE.Static,
        {
          x : wMultiplier * this.w / 3,
          y : yMultiplier * this.h / 9 + 50,
          map : app.assets.sprite("song" + count).data
        }
        );

      count++;

      if(count % 8 == 0)
      {
        wMultiplier++;
        yMultiplier = 1;
      }
      else
      {
        yMultiplier++;
      }
    }
  },

  onrender: function(delta) {
    app.layer.clear();
    app.layer.drawImage(app.assets.image("bg"), 0, 0);
    this.entities.call("render", delta);
    app.layer.drawImage(app.assets.image("logo"), 42, 18);
  },

  onmousedown: function(x, y, button) {
    // if((x > this.startButton.x-this.startButton.map.frame.w/2 && x < this.startButton.x+this.startButton.map.frame.w/2) && (y > this.startButton.y-this.startButton.map.frame.h/2 && y < this.startButton.y+this.startButton.map.frame.h/2)) {
    //   app.selectScene(app.game);
    // }

  },

  onleave: function() {
    this.entities.wipe();
  }

})