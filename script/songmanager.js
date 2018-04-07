/*
  Handles linking song index to the song name and list.
 */

ENGINE.SongManager = function(args) {
  _.extend(this, {
    index : 0,
  }, args)
}

ENGINE.SongManager.prototype = {
  initSong: function () {
    app.game.setSong(this.getSongName(parseInt(this.index)));
    app.game.setList(this.getSongList(parseInt(this.index)));
  },
  
  
  getSongName: function(index)
  {
    switch (index)
    {
      case 0:
        return "ratatat";
      case 1:
        return "unicorn";
      case 2:
        return "standbyme";
      case 3:
        return "lostinfire";
      case 4:
        return "foolmeonce";
      case 5:
        return "glasstable";
      case 6:
        return "childrenof";
      case 7:
        return "mothersson";
      case 8:
        return "newworld";
      case 9:
        return "trumpofdoom";
      case 10:
        return "dondraper";
      case 11:
        return "breakingbad";
      case 12:
        return "newworldremix";
      default:
        return null;
    }    
  },

  getSongList: function(index)
  {
    //TODO need to create new Lists for each song to match the music
    switch (index)
    {
      case 0:
        return new ENGINE.List();
      case 1:
        return new ENGINE.List();
      case 2:
        return new ENGINE.List();
      case 3:
        return new ENGINE.List();
      case 4:
        return new ENGINE.List();
      case 5:
        return new ENGINE.List();
      case 6:
        return new ENGINE.List();
      case 7:
        return new ENGINE.List();
      case 8:
        return new ENGINE.List();
      case 9:
        return new ENGINE.List();
      case 10:
        return new ENGINE.List();
      case 11:
        return new ENGINE.List();
      case 12:
        return new ENGINE.List();
      default:
        return null;
    }
  }
}