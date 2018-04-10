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
      case 0: // ratatat (uses default values from list.js)
        return new ENGINE.List();




      case 1: // Secret of the Unicorn Queen
        return new ENGINE.List(
          {
            song: getUnicornNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 2: // Stand by Me
        return new ENGINE.List(
          {
            song: getStandByMeNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 3: // Things We Lost in the Fire
        return new ENGINE.List(
          {
            song: getLostInFireNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 4: // Fool Me Once
        return new ENGINE.List(
          {
            song: getFoolMeOnceNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 5: // The Glass Table
        return new ENGINE.List(
          {
            song: getGlassTableNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 6: // Children of the Damned
        return new ENGINE.List(
          {
            song: getChildrenOfNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 7: // Every Mother's Son
        return new ENGINE.List(
          {
            song: getMothersSonNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 8: // Brave New World
        return new ENGINE.List(
          {
            song: getNewWorldNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 9: // Trump of Doom (Bonus Track)
        return new ENGINE.List(
          {
            song: getTrumpOfDoomNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 10: // Don Draper (Bonus Track)
        return new ENGINE.List(
          {
            song: getDonDraperNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 11: // Breaking Bad (Bonus Track)
        return new ENGINE.List(
          {
            song: getBreakingBadNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      case 12: // Brave New World Remix (Bonus Track)
        return new ENGINE.List(
          {
            song: getNewWorldRemixNotes(),
            promptDelay: 15200,
            noteDelay: 11100,
          }
        );




      default:
        return null;
    }
  }
}