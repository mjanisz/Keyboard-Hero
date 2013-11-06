ENGINE.Score = function(args) {
	_.extend(this,{
		x: app.width/2,
		y: 103,
		score: 0,
		width: 0,
		image: app.assets.image("sprites"),
		offset: 50,
		opacity: 0,
		fadeout: false
	}, args)
}

ENGINE.Score.prototype = {

	step: function(delta) {
		this.width = app.layer.fillStyle("#fff").font("bold 42px Arial").measureText(this.score).width;
		if(this.opacity < 1 && this.fadeout == false) {
			this.opacity += 0.01;
			this.offset = this.offset - this.offset*this.opacity;
		} else if(this.offset > 0) {
			this.offset -= 5;
		}
	},

	render: function(delta) {
		app.layer
	      .save()
	      .translate(this.x, this.y - this.offset)
	      .globalAlpha(this.opacity)
	      .drawImage(this.image, this.map.frame.x, this.map.frame.y, this.map.frame.w, this.map.frame.h, -this.map.frame.w/2, -this.map.frame.h/2, this.map.frame.w, this.map.frame.h)
	      .restore(); 
		app.layer.fillStyle("rgba(255, 255, 255, "+this.opacity+")").font("bold 42px Arial").fillText(this.score, app.width/2 - this.width/2, this.y+14-this.offset);
	},

	increase: function(multiplier) {
		this.score += (1 * multiplier);
	}

}