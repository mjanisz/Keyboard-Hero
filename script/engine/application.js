ENGINE.Application = function(args) {

  var app = this;

  _.extend(this, args);

  this.layer = cq(632, 660);

  this.loader = new ENGINE.Loader(this.layer);
  this.sprites = new ENGINE.Sprites();
  this.assets = new ENGINE.Assets(this.loader); 

  eveline(this);

  this.layer.appendTo("body");
  this.oncreate();

  this.loader.ready(function() {
    app.onready();
  });

};

ENGINE.Application.prototype = { 

  dispatch: function(method) {

    if (this.scene && this.scene[arguments[0]]) this.scene[arguments[0]].apply(this.scene, Array.prototype.slice.call(arguments, 1));
  },

  selectScene: function(scene) {

    this.dispatch("onleave");

    this.scene = scene;

    this.dispatch("onenter");
  },

  onstep: function(delta) {
    this.dispatch("onstep", delta);
  },

  onrender: function(delta) {
    this.dispatch("onrender", delta);
  },

  onkeydown: function(key) {
    this.dispatch("onkeydown", key);
  },

  onmousedown: function(x, y) {
    this.dispatch("onmousedown", x, y);
  }

};
