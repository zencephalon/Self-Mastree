Trees = new Meteor.Collection("trees");

Tree = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Tree.create = function(o) {
  id = Trees.insert(o);
  o['_id'] = id;
  if (o['children'] === undefined) {
    o['children'] = [];
  }
  return new Tree(o);
}

Tree.findOne = function(o) {
  tree = new Tree(Trees.findOne(o));
  return tree;
}

Tree.prototype.create_child = function(o) {
  o['parent'] = this._id;
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
    Trees.update(this._id, {"$set": update});
  }
}