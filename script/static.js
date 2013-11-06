ENGINE.Static = function(args) {
	_.extend(this,{
		x: app.width/2,
		y: app.height/2,
		opacity: 1,
		image: app.assets.image("sprites"),
		map: app.assets.sprite("start").data,
		offset: 0,
		fadein: false,
		fadeout: false,
		onlytext: false,
	}, args)
}

ENGINE.Static.prototype = {

	step: function(delta){
		if(this.opacity < 1 && this.fadein) {
			this.opacity += 0.01;
			this.offset -= this.offset*this.opacity;
		} else if(this.opacity > 0.01 && this.fadeout) {
			this.opacity -= 0.01;
			this.offset -= 2;
		};
		if(this.onlytext) {
			this.width = app.layer.fillStyle("#fff").font("bold 20px Arial").measureText(this.text).width;
		}
	},

	render: function(delta) {
		if(this.onlytext){
			app.layer.fillStyle("rgba(255, 255, 255, "+this.opacity+")").font("bold 20px Arial").fillText(this.text, app.width/2 - this.width/2, this.y+14-this.offset);
		} else {
		app.layer
	      .save()
	      .globalAlpha(this.opacity)
	      .translate(this.x, this.y - this.offset)
	      .drawImage(this.image, this.map.frame.x, this.map.frame.y, this.map.frame.w, this.map.frame.h, -this.map.frame.w/2, -this.map.frame.h/2, this.map.frame.w, this.map.frame.h)
	      .restore();
	      if(this.text) {
	      	app.layer.fillStyle("rgba(255, 255, 255, "+this.opacity+")").font("bold 40px Arial").fillText(this.text, app.width/2-12, this.y+30);
	      };
	    };
	}

}