Trees = new Meteor.Collection("trees");

Tree = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Tree.create = function(o) {
  if (o['children'] === undefined) {
    o['children'] = [];
  }
  o['count'] = 0;
  o['total_count'] = 0;

  id = Trees.insert(o);

  o['_id'] = id;
  return new Tree(o);
}

Tree.findOne = function(o) {
  return new Tree(Trees.findOne(o));
}

Tree.prototype.getParent = function() {
  return Tree.findOne(this.parent);
}

Tree.prototype.incCount = function(own) {
  if (own === true) {
    this.update({"$inc": {"count": 1}});
  }
  this.update({"$inc": {"total_count": 1}});
  if (this.parent !== undefined)  {
    this.getParent().incCount(false);
  }
}

Tree.prototype.kids = function() {
  return _.map(this.children, function(o) {return Tree.findOne(o)});
}

Tree.prototype.createChild = function(o) {
  o['parent'] = this._id;
  o['uid'] = this.uid;
  child = Tree.create(o);
  this.children.push(child._id);
  this.update();
  return child;
}

Tree.prototype.update = function(update) {
  if (update === undefined) {
    o = {};
    for (p in this) {
      if (p != '_id') {
        o[p] = this[p];
      }
    }
    Trees.update(this._id, {"$set": o});
  } else {
    Trees.update(this._id, update);
  }
}

Tree.prototype.removeChild = function(child) {
  children = _.without(this.children, child);
  this.update({"$set": {children: children}});
}

Tree.prototype.remove = function() {
  Trees.remove(this._id);
  parent = Tree.findOne(this.parent);
  parent.removeChild(this._id);
}