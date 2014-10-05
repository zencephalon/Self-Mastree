Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("user_trees");
  },
  action: function() {
    this.render("/");
  }
});

Router.route('/t/:_id/inc', function () {
  console.log(this.params._id);
  var req = this.request;
  var res = this.response;
  tree = Tree.findOne(this.params._id);
  tree.incCount(true, 1);
  res.end('success ' + (tree.total_count+1));
}, {where: 'server'});
