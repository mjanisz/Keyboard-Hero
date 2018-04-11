/*
  Generates the notes for the game screen
 */
ENGINE.List = function(args) {
	_.extend(this, {
		song: getRatatatNotes(),
		bar: 0,
		lastBarUsed: 0,
    promptDelay: 15200, // delay to use for the how to play and ready countdown messages.
    noteDelay: 11100 // delay before the game starts to show notes
	}, args)
};

ENGINE.List.prototype = {

	barUsed: function(args) {
		this.lastBarUsed = args;
	},

	nextBar: function() {
		this.bar += 1;
	},

	getNotes: function(bar) {
		if(bar <= this.song.length) {
			return this.song[bar]
		}
	},

	reset: function() {
		this.lastBarUsed = 0;
		this.bar = 0;
	}
};