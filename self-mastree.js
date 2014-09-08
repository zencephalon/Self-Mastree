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

  Template.hello.events({
    'click': function () {
      console.log(this);
      console.log(this.count);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
