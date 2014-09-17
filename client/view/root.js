Template.root.root = function() {
  if (Meteor.userId()) {
    return Tree.findOne({root: true, uid: Meteor.userId()});
  } else {
    return {title: "Sign in to see your Self-Mastree", total_count: 0}
  }
}

Mousetrap.bind('down', function() {
  ViewNode.selectNextSibling();
});
Mousetrap.bind('up', function() {
  ViewNode.selectPrevSibling();
});
Mousetrap.bind('left', function() {
  ViewNode.selectParent();
});
Mousetrap.bind('right', function() {
  ViewNode.selectChildren();
});
Mousetrap.bind('ctrl+space', function() {
  ViewNode.insertCreateForm();
});
Mousetrap.bind('ctrl+x', function() {
  ViewNode.removeSelected();
});