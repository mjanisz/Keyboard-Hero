ENGINE.Collection = function(parent) {

  this.parent = parent;

  this.index = 0;

  this.dirty = false;
}

ENGINE.Collection.prototype = new Array;

_.extend(ENGINE.Collection.prototype, {

  add: function(constructor, args) {
	var entity = new constructor(_.extend({    
	  collection: this,
	  index: this.index++
	}, args));
	this.push(entity);
	return entity;
  },

  clean: function() {
	for (var i = 0, len = this.length; i < len; i++) {
	  if (this[i]._remove) {
		this.splice(i--, 1);
		len--;
	  }
	}
  },

  wipe: function() {
	for (var i = 0, len = this.length; i < len; i++) {
		this.splice(i--, 1);
		len--;
	}
  },

  step: function(delta) {
	if (this.dirty) {
	  this.dirty = false;
	  this.clean();
	  this.sort(function(a, b) {
		return (a.zIndex | 0) - (b.zIndex | 0);
	  });
	}

  },
  call: function(method) {
	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0, len = this.length; i < len; i++) {
	  if(this[i][method]) this[i][method].apply(this[i], args);
	}
  },

  apply: function(method, args) {
	for (var i = 0, len = this.length; i < len; i++) {
	  if(this[i][method]) this[i][method].apply(this[i], args);
	}
  }

});
