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
Mousetrap.bind('ctrl+space', function() {
  TreeView.insertCreateForm();
});
Mousetrap.bind('ctrl+x', function() {
  TreeView.removeSelected();
});