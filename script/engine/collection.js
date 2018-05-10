ENGINE.Collection = function(parent) {

  /* the object that manages the collection */

  this.parent = parent;

  /* unique id for every entity */

  this.index = 0;

  /* if something inside dies - it needs to be removed,
     it is so tempting to call it *filthy* instead */

  this.dirty = false;
}

/* copy array prototype */
ENGINE.Collection.prototype = new Array;

_.extend(ENGINE.Collection.prototype, {

  /* creates new object instance with given args and pushes it to the collection
       example:
       var entities = new ENGINE.Collection;
           entities.add(ENGINE.Soldier, { x: 32, y: 64});
  */

  add: function(constructor, args) {

    /* in order to avoid manually attaching collection and indexing the new entity
       we create it within the collection which manages the current index
       as well as remove obsolete entities if needed */

	var entity = new constructor(_.extend({    
	  collection: this,
	  index: this.index++
	}, args));

    /* since we use Array as a prototype we can call all javascript native array methods */

    this.push(entity);
	return entity;
  },

  /* remove dead bodies so they don't drain CPU for lying around */
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

  /* needs to be called in order to keep track on collection's garbage */

  step: function(delta) {

  /* check if some removals has to be applied */
	if (this.dirty) {

    /* tell the collection that it has been cleaned */
	  this.dirty = false;
	  this.clean();

    /* also let's sort the entities by the zIndex */
	  this.sort(function(a, b) {
		return (a.zIndex | 0) - (b.zIndex | 0);
	  });
	}

  },

  /* call some method of every entitiy
       ex: enemies.call("shoot", 32, 24);
     will invoke shoot method from each item in collection
  */

  call: function(method) {

  /* because `arguments` is not a real array and it does not have slice method
     and we need to get rid of first argument which is a method name */

	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0, len = this.length; i < len; i++) {
	  if(this[i][method]) this[i][method].apply(this[i], args);
	}
  },

  /* call some method of every entitiy
       ex: enemies.apply("shoot", [32, 24]);
     the difference is that it takes an array - not list of arguments
  */

  apply: function(method, args) {
	for (var i = 0, len = this.length; i < len; i++) {
	  if(this[i][method]) this[i][method].apply(this[i], args);
	}
  }

});
