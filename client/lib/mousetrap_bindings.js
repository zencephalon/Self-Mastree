Mousetrap.bind('down', function() {
  TreeView.select.nextSibling();
});
Mousetrap.bind('up', function() {
  TreeView.select.prevSibling();
});
Mousetrap.bind('left', function() {
  TreeView.select.parent();
});
Mousetrap.bind('right', function() {
  TreeView.select.children();
});
Mousetrap.bind('space', function() {
  tree = Tree.findOne(Session.get("selected_tree"));
  tree.incCount(true);
});
Mousetrap.bind('shift+space', function() {
  tree = Tree.findOne(Session.get("selected_tree"));
  tree.incCount(true, -1);
});
Mousetrap.bind('ctrl+n', function() {
  TreeView.insertCreateForm();
});
Mousetrap.bind('ctrl+x', function() {
  TreeView.removeSelected();
});
Mousetrap.bind('enter', function() {
  tree = Tree.findOne(Session.get("selected_tree"));
  tree.toggleFold();
});
