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

Tree.prototype.create_child = function(o) {
  o['parent'] = this._id;
  child = Tree.create(o);
  this.children.push(child._id);
  this.update();
  return child;
}

Tree.prototype.update = function(update) {
  if (update === undefined) {
    Trees.update(this._id, {"$set": this});
  } else {
    Trees.update(this._id, {"$set": update});
  }
}