/*
  Object that handles the different scenes of the game
 */

ENGINE.Scene = function(args) {

  _.extend(this, args);

  if (this.oncreate) this.oncreate();
};

ENGINE.Scene.prototype = {

    /* default reactions to events so we don't have to bother
       whether the action has been provided or not */

  onenter: function() { },
  onleave: function() { },
  onrender: function() { },
  onstep: function() { }

};
