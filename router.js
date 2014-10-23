Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("user_trees");
  },
  action: function() {
    this.render("/");
  }
});

Router.route('/t/:_id/inc', function () {
  var req = this.request;
  var res = this.response;
  tree = Tree.findOne(this.params._id);
  tree.incCount(true);
  res.end('success ' + (tree.total_count+1));
}, {where: 'server'});
