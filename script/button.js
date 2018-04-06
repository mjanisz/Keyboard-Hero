/*
  rezoner -

  ENTITIES

  This is how I usually define constructors. No magic, just javascript purity.

  If you are not familiar with entities concept here is a quick summary.

  Entities are objects that has some common methods - for us it will render and step. The game can call all the entities in one loop without carring are they tanks, soldiers, or trees - for the game loop they are just entitites which have definitions of what should they do on step and how they should be rendered.
 */

ENGINE.Button = function(args) {
	
	_.extend(this, {
		x: 0,
		y: 0,
		image: app.assets.image("sprites"),
		map: app.assets.sprite("green").data,
    speed: 3
	}, args)
}

ENGINE.Button.prototype = {

  step: function(delta) {
    var md=delta/4;
    this.y += 1 * md;
    if(this.y> app.height+30) {
      this.remove();
      this.chain.miss();
    };
  },

  render: function(delta) { 
    app.layer
      .save()
      .translate(this.x, this.y)
      .drawImage(this.image, this.map.frame.x, this.map.frame.y, this.map.frame.w, this.map.frame.h, -this.map.frame.w/2, -this.map.frame.h/2, this.map.frame.w, this.map.frame.h)
      .restore();    
  },

  remove: function() {
    this._remove = true;
    this.collection.dirty = true;
  }

};