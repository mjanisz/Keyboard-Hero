/*
  Handles referencing files from the assets folder.
 */

ENGINE.Assets = function(loader) {

  /* make use of the loader that we already have */
  this.loader = loader;

  /* lookup directories so we don't have to provide full paths every time */
  this.paths = {
	images: "assets/images/",
	audio: "assets/audio/"
  };

  /* here we will hold the raw assets */
  this.data = {
	images: [],
	sprites: [],
	audio: []
  };
};

ENGINE.Assets.prototype = {

  /* get image by key - key is created by removing extension from filename for example
             units/tank.png
     becomes units/tank
  */

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
	};
	return sprite
  },

  /* add many images */
  addImages: function(filenames) {
	for (var i = 0; i < filenames.length; i++) {
	  this.addImage(filenames[i]);
	}
  },

  addSprites: function(sprite, atlas) {
	this.addImage(sprite);
	for (var i=0; i < atlas.length; i++) {
	  this.addSprite(atlas[i], sprite);
	}
  },

  /* add one image */
  addImage: function(filename) {
	var image = new Image;

	/* pass the image to the loader */
	this.loader.image(image);

	/* we gonna rip off extension */
	var key = filename.match(/(.*)\..*/)[1];

	/* add image to the assets */
	this.data.images[key] = image;

	/* lets search for image in defined path */
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

