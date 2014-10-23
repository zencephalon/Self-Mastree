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
  o['val'] = 1;
  o['createdAt'] = new Date();

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

Tree.prototype.incCount = function(own, subtract, amount) {
  if (amount === undefined) {
    amount = subtract ? -this.val : this.val;
  }

  update = {};
  if (own) { update["count"] = amount }

  date = new Date();

  update[Tree.yearKey(date) + ".count"] = amount;
  update[Tree.monthKey(date) + ".count"] = amount;
  update[Tree.monthDayKey(date) + ".count"] = amount;
  update[Tree.weekDayKey(date) + ".count"] = amount;
  update[Tree.hourKey(date)] = amount;
  update["total_count"] = amount;
  this.update({"$inc": update});

  if (this.parent !== undefined)  {
    this.getParent().incCount(false, subtract, amount);
  }
  if (this.links) {
    this.links.forEach(function (link) { Tree.findOne(link).incCount(false, subtract, amount) });
  }
}

Tree.prototype.fold = function(val) {
  this.update({"$set":{folded: val}});
}

Tree.prototype.kids = function() {
  return _.chain(
    this.children
  ).map(
    function(o) {return Tree.findOne(o)}
  ).reject(
    function(tree) { return tree.archived }
  ).value();
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

Tree.prototype.unfoldUp = function (first) {
  this.fold(false);
  that = this;
  if (this.parent) {
    parent = Tree.findOne(this.parent);
    if (!first) {
      parent.kids().forEach(function(kid) {
        if (kid._id != that._id) {
          kid.fold(true);
        }
      });
    }
    parent.unfoldUp();
  }
}

Tree.prototype.toggleFold = function () {
  this.update({"$set": {folded: !this.folded}});
}

Tree.prototype.folded_has_kids = function() {
  return this.folded && (this.children.length > 0);
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

Tree.prototype.updateVal = function (val, update) {
  this.val = parseInt(val);
  if (update) {
    this.update();
  }
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
    old_parent.updateChildren(old_parent_children);
  }

  new_parent = Tree.findOne(parent_id);
  new_parent.children.push(this._id);
  new_parent.updateChildren(new_parent.children);

  this.update({"$set": {parent: parent_id}});
}

Tree.prototype.updateChildren = function(children) {
  this.update({"$set":{children: _.uniq(children)}});
}

Tree.prototype.dayCount = function(date) {
  year = date.getFullYear();
  month = date.getMonth();
  month_day = date.getDate();
  week_day = date.getDay();
  try {
    return this['date'][year][month][month_day][week_day]['count'];
  } catch(e) {
    return 0
  }
}

Tree.prototype.todayCount = function () {
  return this.dayCount(new Date());
}

Tree.prototype.yesterdayCount = function () {
  date = new Date();
  date.setDate(date.getDate() - 1);
  return this.dayCount(date);
}

Tree.prototype.average = function() {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  if (this.createdAt) {
    var start = this.createdAt;
    var now = new Date();

    var diffDays = Math.floor((now.getTime() - start.getTime()) / oneDay);
    var today_count = this.todayCount();
    if (diffDays == 0) {
      return today_count;
    }
    return Tree.cleanAvg(this.total_count - today_count, diffDays);
  }
}

Tree.prototype.recordStats = function() {
  day_record = 0;
  day_total = 0;
  day_count = 0;
  hour_record = 0;
  hour_total = 0;
  hour_count = 0;
  for (year in this.date) {
    for (month in this.date[year]) {
      for (month_day in this.date[year][month]) {
        if (month_day != "count") {
          current_day = this.date[year][month][month_day].count;

          if (current_day !== undefined) {
            day_total += current_day;
            day_count += 1;

            if (current_day > day_record) {
              day_record = current_day;
            }

            for (week_day in this.date[year][month][month_day]) {
              for (hour in this.date[year][month][month_day][week_day]) {
                if (hour != "count") {
                  current_hour = this.date[year][month][month_day][week_day][hour];

                  if (current_hour !== undefined) {
                    hour_total += current_hour;
                    hour_count += 1;

                    if (current_hour > hour_record) {
                      hour_record = current_hour;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return {day: {record: day_record, avg: Tree.cleanAvg(day_total, day_count)}, hour: {record: hour_record, avg: Tree.cleanAvg(hour_total, hour_count)}};
}

Tree.cleanAvg = function(total, num) {
  return Math.round((total / num) * 10) / 10;
}
