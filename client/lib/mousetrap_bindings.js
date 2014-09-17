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