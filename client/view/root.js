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
    Session.set("selected_node", this._id);
  }
});

ViewNode = {
  select: function(id) {
    $('.selected').removeClass('selected');
    $('div[data-id=' + id + ']').addClass('selected');
  }
}

Tracker.autorun(function() {
  if (Session.get("selected_node") !== undefined) {
    ViewNode.select(Session.get("selected_node"));
  }
  // code to select a node div based on this reactive session attr
})