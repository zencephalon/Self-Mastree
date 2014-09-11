Template.root.root = function() {
  return Tree.findOne({root: true, uid: Meteor.userId()});
}

Template.root.events({
  'click': function () {
    this.incCount(true);
  }
});