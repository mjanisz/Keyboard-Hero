ENGINE.Loader = function(layer) {

  this.total = 0;
  this.count = 0;
  this.progress = 0;
  this.callbacks = []

  this.loading = false;
  this.layer = layer;
};

ENGINE.Loader.prototype = {
  add: function() {
    this.loading = true;
    this.count++;
    this.total++;
    this.layer.clear();
    this.layer.fillStyle("rgba(255, 255, 255, 1)").font("bold 42px Arial").fillText("Loading: "+(this.total - this.count) / this.total+" %", 315, 330);
  },

  image: function(image) {
    var loader = this;
    image.addEventListener("load", function() {
      loader.onItemReady();
    });

    image.addEventListener("error", function() {
      loader.onItemError(this.src);
    });

    this.add();
  },

  audio: function(audio) {
    var loader = this;

    audio.addEventListener('canplaythrough', function() {
      loader.onItemReady();
    });

    audio.addEventListener('error', function() {
      loader.onItemError(this.src);
    });

    this.add();
  },

  foo: function(duration) {
    var loader = this;

    this.add();

    setTimeout(function() {
      loader.onItemReady();
    }, duration);
  },

  ready: function(callback) {
    if (!this.loading) {
      callback();
    } else {
      this.callbacks.push(callback);
    }

  },

  onItemReady: function() {
    this.count--;
    this.progress = (this.total - this.count) / this.total;
    this.layer.clear();
    this.layer.fillStyle("rgba(255, 255, 255, 1)").font("bold 42px Arial").fillText("Loading: "+this.progress * 100+" %", 320, 320);
    console.log("loaded element");
    if (this.count <= 0) {
      this.loading = false;
      for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i]();
      }
      this.callbacks = [];
      this.total = 0;
    }
  },

  onItemError: function(source) {
    console.log("unable to load ", source);
  }
};
