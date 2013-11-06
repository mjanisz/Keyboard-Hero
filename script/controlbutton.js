ENGINE.ControlButton = function(args) {
	_.extend(this, {
		moved: false,
		oldY: 0,
		opacity: 0,
		fadeout: false
	}, args)
}

ENGINE.ControlButton.prototype = new ENGINE.Button();
ENGINE.ControlButton.prototype.constructor = ENGINE.ControlButton;

_.extend(ENGINE.ControlButton.prototype, {

	step: function(delta) {
		if(this.moved && this.y > this.oldY) {
			this.y = this.y-5;	
		} else {
			this.moved = false;
		}
		if(this.opacity < 1 && !this.fadeout) {
			this.opacity +=0.1;
		} else if(this.fadeout && this.opacity > 0.05) {
			this.opacity -= 0.05;
		}
	},

	bounce: function() {
		if(!this.moved) {
			this.oldY = this.y;
			this.y = this.y + 10;
			this.moved = !this.moved;
		}
	},

  render: function(delta) { 
    app.layer
      .save()
      .globalAlpha(this.opacity)
      .translate(this.x, this.y)
      .drawImage(this.image, this.map.frame.x, this.map.frame.y, this.map.frame.w, this.map.frame.h, -this.map.frame.w/2, -this.map.frame.h/2, this.map.frame.w, this.map.frame.h)
      .restore();    
  }

})