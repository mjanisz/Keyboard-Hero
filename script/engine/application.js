ENGINE.Application = function(args) {

  var app = this;

  _.extend(this, args);

  /* create full screen canvas wrapper - we will draw on it */

  this.layer = cq(632, 660);

  /* create loader and assets manager */

  this.loader = new ENGINE.Loader(this.layer);
  this.sprites = new ENGINE.Sprites();
  this.assets = new ENGINE.Assets(this.loader);

  /* bind events to the application using eveline library
     it checks if provided object has properties coresponding with
     events supported by the library like onmousemove, ongamepadup
     then if the property exists binds the callback to the proper DOM event
  */

  eveline(this);

  /* add it to the document */

  this.layer.appendTo("body");

  /* run a callback provided by the end-developer */

  this.oncreate();

  /* fire loader */
  this.loader.ready(function() {
    app.onready();
  });

};

ENGINE.Application.prototype = {
  /*
       calls the method in current scene with given arguments
       for example
       this.dispatch("onmousemove", 32, 64);
       will trigger onmousemove method in current scene (if it has one)
  */
  dispatch: function(method) {

    if (this.scene && this.scene[arguments[0]]) this.scene[arguments[0]].apply(this.scene, Array.prototype.slice.call(arguments, 1));
  },

  selectScene: function(scene) {

    /* tell the current scene that it is being closed */
    this.dispatch("onleave");

    /* swap current scene */
    this.scene = scene;

    /* say hello to the new scene */
    this.dispatch("onenter");
  },

  /* Now pass the events from eveline to the current scene.
       It could be done in many different ways - but seriously -
       there are not like 2000 events so let's do this by finger */

  /* game logic step (setInterval) */
  onstep: function(delta) {
    this.dispatch("onstep", delta);
  },

  /* rendering loop (requestAnimationFrame) */
  onrender: function(delta) {
    this.dispatch("onrender", delta);
  },

  /* they key gets translated to a string like shift, escape, a, b, c */
  onkeydown: function(key) {
    this.dispatch("onkeydown", key);
  },

  onmousedown: function(x, y) {
    this.dispatch("onmousedown", x, y);
  }

};
