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
  if (o['folded'] === undefined) {
    o['folded'] = false;
  }
  if (o['title']) {
    if (o['title'].slice(0, 1) == '@') {
      o['attr'] = o['title'].slice(1, -1);
    }
    if (o['title'].slice(0, 1) == '#') {
      o['hash'] = o['title'].slice(1, -1);
    }
  }
  o['archived'] = false;
  o['focused'] = false;
  o['count'] = 0;
  o['total_count'] = 0;

  id = Trees.insert(o);

  o['_id'] = id;
  return new Tree(o);
}

Tree.focused = function(raw) {
  tree = Trees.findOne({focused: true})
  if (raw === undefined) {
    return new Tree(tree);
  } else {
    return tree;
  }
}

Tree.findOne = function(o) {
  return new Tree(Trees.findOne(o));
}

Tree.findOneByTitle = function(title) {
  return new Tree(Trees.findOne({title: title}));
}

Tree.yearKey = function (date) {
  return "date." + date.getFullYear();
}

Tree.monthKey = function (date) {
  return Tree.yearKey(date) + "." + date.getMonth();
}

Tree.monthDayKey = function (date) {
  return Tree.monthKey(date) + "." + date.getDate();
}

Tree.weekDayKey = function(date) {
  return Tree.monthDayKey(date) + "." + date.getDay();
}

Tree.hourKey = function(date) {
  return Tree.weekDayKey(date) + "." + date.getHours();
}

Tree.prototype.archive = function() {
  this.update({"$set": {archived: true}});
}

Tree.prototype.focus = function() {
  var focused = Tree.focused();
  focused.update({"$set": {focused: false}});
  this.update({"$set": {focused: true}});
}

Tree.prototype.getParent = function() {
  return Tree.findOne(this.parent);
}

Tree.prototype.incCount = function(own, amount) {
  if (amount === undefined) {
    amount = 1;
  }

  update = {};
  if (own === true) {
    update["count"] = amount
  }

  date = new Date();

  update[Tree.yearKey(date) + ".count"] = amount;
  update[Tree.monthKey(date) + ".count"] = amount;
  update[Tree.monthDayKey(date) + ".count"] = amount;
  update[Tree.weekDayKey(date) + ".count"] = amount;
  update[Tree.hourKey(date)] = amount;
  update["total_count"] = amount;
  this.update({"$inc": update});

  if (this.parent !== undefined)  {
    this.getParent().incCount(false, amount);
  }
}

Tree.prototype.kids = function() {
  return _.reject(_.map(this.children,
                        function(o) {return Tree.findOne(o)}
                       ), function(tree) { return tree.archived });
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

Tree.prototype.unfoldUp = function () {
  this.update({"$set": {folded: false}});
  if (this.parent) {
    parent = Tree.findOne(this.parent);
    parent.unfoldUp();
  }
}

Tree.prototype.toggleFold = function () {
  this.update({"$set": {folded: !this.folded}});
}

Tree.prototype.displayTitle = function() {
  index = this.title.search(/\@|\#/);
  return this.title.slice(0, index).trim();
}

Tree.prototype.updateTitle = function(title) {
  attrs = title.match(/\@\w+/g) || [];
  hashes = title.match(/\#\w+/g) || [];
  this.title = title;
  attrs = _.map(attrs, function(attr_title) { return Trees.findOne({title: attr_title})._id });
  hashes = _.map(hashes, function(hash_title) { return Trees.findOne({title: hash_title})._id });
  this.links = attrs.concat(hashes);
  this.update();
}

