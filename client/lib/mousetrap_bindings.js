Mousetrap.bind('down', function() {
  TreeView.focus.nextSibling();
});
Mousetrap.bind('shift+down', function() {
  TreeView.move.nextSibling();
});
Mousetrap.bind('up', function() {
  TreeView.focus.prevSibling();
});
Mousetrap.bind('shift+up', function() {
  TreeView.move.prevSibling();
});
Mousetrap.bind('left', function() {
  TreeView.focus.parent();
});
Mousetrap.bind('right', function() {
  TreeView.focus.children();
});
Mousetrap.bind('space', function() {
  tree = Tree.focused();
  tree.incCount(true);
  return false;
});
Mousetrap.bind('shift+space', function() {
  tree = Tree.focused();
  tree.incCount(true, -1);
  return false;
});
Mousetrap.bind('ctrl+n', function() {
  TreeView.insertCreateForm();
});
Mousetrap.bind('ctrl+x', function() {
  TreeView.removeFocused();
});
Mousetrap.bind('ctrl+r', function() {
  TreeView.insertRenameForm();
});
Mousetrap.bind('enter', function() {
  tree = Tree.focused();
  tree.toggleFold();
});
