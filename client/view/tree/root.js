Template.root.helpers({
  root: function() {
    if (Meteor.userId()) {
      return Tree.findOne({root: true, uid: Meteor.userId()});
    } else {
      return {text: "Sign in to see your Self-Mastree", total_count: 0}
    }
  }
});

Template.root.rendered = function() {
}
