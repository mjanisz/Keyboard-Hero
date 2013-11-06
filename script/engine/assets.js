ENGINE.Assets = function(loader) {

  this.loader = loader;

  this.paths = {
	images: "assets/images/",
	audio: "assets/audio/"
  };

  this.data = {
	images: [],
	sprites: [],
	audio: []
  };
};

ENGINE.Assets.prototype = {

  image: function(key) {
	return this.data.images[key];
  },

  audio: function(key) {
	return this.data.audio[key];
  },

  sprite: function(key) {
	var sprite = {
	  image: this.data.images[key],
	  data: this.data.sprites[key]
	}
	return sprite
  },

  addImages: function(filenames) {
	for (var i = 0; i < filenames.length; i++) {
	  this.addImage(filenames[i]);
	}
  },

  addSprites: function(sprite, atlas) {
	this.addImage(sprite)
	for (var i=0; i < atlas.length; i++) {
	  this.addSprite(atlas[i], sprite);
	}
  },

  addImage: function(filename) {

	var image = new Image;
	this.loader.image(image);
	var key = filename.match(/(.*)\..*/)[1];
	this.data.images[key] = image;
	image.src = this.paths.images + filename;

  },

  addSprite: function(atlas, sprite) {
	var data = {};
	var key = atlas.filename.match(/(.*)\..*/)[1];
	data.frame = atlas.frame;
	data.image = sprite.match(/(.*)\..*/)[1];
	data.rotated = atlas.rotated;
	this.data.sprites[key] = data;
  },

  addAudio: function(filename) {
	var audio = new Audio;
	this.loader.audio(audio);
	var key = filename.match(/(.*)\..*/)[1];
	this.data.audio[key] = audio;
	audio.src = this.paths.audio + filename;    
  }
};

