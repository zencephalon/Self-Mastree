Mousetrap.bind('down', function() {
  ViewNode.select.nextSibling();
});
Mousetrap.bind('up', function() {
  ViewNode.select.prevSibling();
});
Mousetrap.bind('left', function() {
  ViewNode.select.parent();
});
Mousetrap.bind('right', function() {
  ViewNode.select.children();
});
Mousetrap.bind('ctrl+space', function() {
  ViewNode.insertCreateForm();
});
Mousetrap.bind('ctrl+x', function() {
  ViewNode.removeSelected();
});