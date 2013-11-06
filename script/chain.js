ENGINE.Chain = function(args) {
	_.extend(this, {
		x: 561,
		y: 236,
		image: app.assets.image("sprites"),
		mapbg: app.assets.sprite("bar-bg").data,
		fill: app.assets.sprite("bar").data,
		star: app.assets.sprite("star").data,
		multiplier: 1,
		combo: 0,
		offset: 50,
		opacity: 0,
		fadeout: false
	}, args)
}

ENGINE.Chain.prototype = {

	increase: function() {
		this.combo += 1;
		if((this.combo%10 == 0) && (this.combo > 0)) {
			this.multiplier += 1;
		}
	},

	miss: function() {
		this.multiplier = 1;
		this.combo = 0;
	},

	step: function(delta){
		this.width = app.layer.fillStyle("#fff").font("bold 20px Arial").measureText(this.score).width;
		if(this.opacity < 1 && !this.fadeout) {
			this.opacity += 0.01;
			this.offset = this.offset - this.offset*this.opacity;
		} else if (this.opacity > 0.05 && this.fadeout) {
			this.opacity -= 0.05;
		}
	},

	render: function(delta){
	    app.layer
	      .save()
	      .globalAlpha(this.opacity)
	      .drawImage(this.image, this.mapbg.frame.x, this.mapbg.frame.y, this.mapbg.frame.w, this.mapbg.frame.h, this.x + this.offset, this.y, this.mapbg.frame.w, this.mapbg.frame.h)
	      .restore();
	   	app.layer
	      .save()
	      .globalAlpha(this.opacity)
	      .drawImage(this.image, this.fill.frame.x, (this.fill.frame.y+this.fill.frame.h) - ((this.fill.frame.h/10)*(this.combo%10 +1)), this.fill.frame.w, (this.fill.frame.h/10)*(this.combo%10 +1), this.x + this.offset, this.y+12+this.fill.frame.h- ((this.fill.frame.h/10)*(this.combo%10 +1)), this.fill.frame.w, (this.fill.frame.h/10)*(this.combo%10 +1))
	      .restore();
	    app.layer
	      .save()
	      .globalAlpha(this.opacity)
	      .drawImage(this.image, this.star.frame.x, this.star.frame.y, this.star.frame.w, this.star.frame.h, this.x - 5 + this.offset, this.y + this.mapbg.frame.h +20, this.star.frame.w, this.star.frame.h)
	      .restore();
	    app.layer.fillStyle("rgba(255, 255, 255, "+this.opacity+")").font("bold 20px Arial").fillText(this.multiplier, this.x + this.offset + 20, this.y+this.mapbg.frame.h +35);
	}

}