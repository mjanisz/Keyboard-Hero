ENGINE.Scene = function(args) {

  _.extend(this, args);

  if (this.oncreate) this.oncreate();
};

ENGINE.Scene.prototype = {

  onenter: function() { },
  onleave: function() { },
  onrender: function() { },
  onstep: function() { }

};
