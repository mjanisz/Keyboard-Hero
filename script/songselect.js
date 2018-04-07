/*
  Handles selecting different songs from the song select scene.
 */
app.songselect = new ENGINE.Scene({

  /*
    Initializes variables for iterations down the line
  */
  songOne:"",
  songTwo:"",
  songThree:"",
  songFour:"",
  songFive:"",
  songSix:"",
  songSeven:"",
  songEight:"",
  songNine:"",
  songTen:"",
  songEleven:"",
  songTwelve:"",
  songThirteen:"",
  oncreate: function () {
    this.entities = new ENGINE.Collection(this);
    this.w = app.width;
    this.h = app.height;

    this.songNumbers = [this.songOne, this.songTwo, this.songThree, this.songFour, this.songFive, this.songSix, this.songSeven, this.songEight,
      this.songNine, this.songTen, this.songEleven, this.songTwelve, this.songThirteen];
  },

  onenter: function () {
    var count = 1;
    var wMultiplier = 1;
    var yMultiplier = 1;

    for (var index in this.songNumbers) {

      //Assign Static objects to local variables
      this.songNumbers[index] = this.entities.add(ENGINE.Static,
        {
          x: wMultiplier * this.w / 3,
          y: yMultiplier * this.h / 9 + 50,
          map: app.assets.sprite("song" + count).data
        }
      );
      count++;

      if (count % 8 == 0) {
        wMultiplier++;
        yMultiplier = 1;
      }
      else {
        yMultiplier++;
      }
    }
  },

  onrender: function (delta) {
    app.layer.clear();
    app.layer.drawImage(app.assets.image("bg"), 0, 0);
    this.entities.call("render", delta);
    app.layer.drawImage(app.assets.image("logo"), 42, 18);
  },

  onmousedown: function (x, y) {
    var index = this.findSelectedSong(x, y);
    if(index != null)
    {
      app.game.setSongManagerIndex(index);
      app.selectScene(app.game);
    }
  },

  onleave: function () {
    this.entities.wipe();
  },

  /*
    Checks the user click coordinates and determines what song button the select.
    If they click somewhere that doesn't have a song button, returns null so that
    nothing is set prematurely.
   */
  findSelectedSong: function (x, y) {
    for (var index in this.songNumbers) {
      number = this.songNumbers[index];
      if (x > number.x - number.map.frame.w / 2 &&
        x < number.x + number.map.frame.w / 2 &&
        y > number.y - number.map.frame.h / 2 &&
        y < number.y + number.map.frame.h / 2)
      {
        console.log("song index - " + index);
        return index;
      }
    }
    return null;
  }
}
)