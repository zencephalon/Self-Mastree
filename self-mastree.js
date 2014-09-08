var countDep = new Deps.Dependency;

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.root = function() {
    console.log(Tree.findOne({root: true}));
    return Tree.findOne({root: true});
  }

  Template.node.score = function() {
    countDep.depend();
    if (this.children === []) {
      return this.count;
    } else {
      return _.reduce(this.kids, function(memo, child) { return memo + child.score()}, 0);
    }
  }

  Template.hello.events({
    'click': function () {
      countDep.changed();
      console.log(this);
      this.incCount(true);
      console.log(this.count);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
