ENGINE.HitButton = function(args) {
	_.extend(this,{
		alpha: 0
	}, args)
}

ENGINE.HitButton.prototype = new ENGINE.Button();
ENGINE.HitButton.prototype.constructor = ENGINE.HitButton;

_.extend(ENGINE.HitButton.prototype, {
	
	step: function(delta) {
		if(this.alpha > 0.1) {
			this.alpha -= 0.1
		}
	},

	render: function(delta) { 
	    app.layer
	      .save()
	      .globalAlpha(this.alpha)
	      .translate(this.x-5, this.y-40)
	      .drawImage(this.image, this.map.frame.x, this.map.frame.y, this.map.frame.w, this.map.frame.h, -this.map.frame.w/2, -this.map.frame.h/2, this.map.frame.w, this.map.frame.h)
	      .restore();    
  	},

	makeVisible: function() {
		this.alpha = 1;
	}
})