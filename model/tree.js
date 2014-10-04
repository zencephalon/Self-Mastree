Trees = new Meteor.Collection("trees");

Trees.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.uid === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.uid === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.uid === userId;
  },
  fetch: ['uid']
});

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
  if (o['links'] === undefined) {
    o['links'] = [];
  }
  if (o['focused'] === undefined) {
    o['focused'] = false;
  }
  o['archived'] = false;
  o['count'] = 0;
  o['total_count'] = 0;

  if (o['text']) {
    o['text'] = o['text'].trim();
    o['ref'] = Tree.extractRef(o['text']);
    o['links'] = Tree.extractLinks(o['text']);
  }

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

Tree.findOneByText = function(text) {
  return new Tree(Trees.findOne({text: text}));
}

Tree.findOneByRef = function(ref) {
  return new Tree(Trees.findOne({ref: ref}));
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
  if (!this.root) {
    this.update({"$set": {archived: true}});
  }
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
  if (this.links) {
    this.links.forEach(function (link) { Tree.findOne(link).incCount(false, amount) });
  }
}

Tree.prototype.fold = function(val) {
  this.update({"$set":{folded: val}});
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
  this.updateChildren(children);
}

Tree.prototype.remove = function() {
  Trees.remove(this._id);
  parent = Tree.findOne(this.parent);
  parent.removeChild(this._id);
}

Tree.prototype.unfoldUp = function () {
  this.fold(false);
  that = this;
  if (this.parent) {
    parent = Tree.findOne(this.parent);
    parent.kids().forEach(function(kid) {
      if (kid._id != that._id) {
        kid.fold(true);
      }
    })
    parent.unfoldUp();
  }
}

Tree.prototype.toggleFold = function () {
  this.update({"$set": {folded: !this.folded}});
}

Tree.extractRef = function(text) {
  index = text.search(/\@/);
  if (index == -1) {
    return text.trim();
  } else {
    return text.slice(0, index).trim();
  }
}

Tree.extractLinks = function(text) {
  links = text.match(/\@\(.+?\)/g) || [];
  links = _.map(links, function(link_ref) { return link_ref.slice(2, -1) });
  return _.flatten(_.map(links, function(link_ref) {
    return _.pluck(Trees.find({ref: link_ref}).fetch(), '_id');
  }));
}

Tree.prototype.updateText = function(text, update) {
  this.text = text.trim();
  this.ref = Tree.extractRef(this.text);
  links = Tree.extractLinks(this.text);
  this.links = _.filter(this.links, function(link) { return _.contains(links, link) });
  if (update) {
    this.update();
  }
}

Tree.prototype.addLink = function(link) {
  this.links.push(link);
  this.update({"$set": {links: this.links}});
}

Tree.prototype.updateParent = function(parent_id) {
  if (parent_id != this.parent) {
    old_parent = Tree.findOne(this.parent);
    old_parent_children = old_parent.children;
    index = old_parent_children.indexOf(this._id);
    old_parent_children.splice(index, 1);
    old_parent.update({"$set": {children: old_parent_children}});
  }

  new_parent = Tree.findOne(parent_id);
  new_parent.children.push(this._id);
  new_parent.update({"$set": {children: new_parent.children}});

  this.update({"$set": {parent: parent_id}});
}

Tree.prototype.updateChildren = function(children) {
  this.update({"$set":{children: _.uniq(children)}});
}
