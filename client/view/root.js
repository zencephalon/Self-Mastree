Template.root.root = function() {
  if (Meteor.userId()) {
    return Tree.findOne({root: true, uid: Meteor.userId()});
  } else {
    return {title: "Sign in to see your Self-Mastree", total_count: 0}
  }
}

Template.root.events({
  'click': function () {
    this.incCount(true);
  }
});