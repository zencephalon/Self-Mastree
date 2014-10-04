Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("user_trees");
  }
});
