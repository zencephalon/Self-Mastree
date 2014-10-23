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
  tree.incCount(true, true);
  return false;
});
Mousetrap.bind('ctrl+n', function() {
  $form = $('#create_form');
  if ($form.length == 0) {
    TreeView.insertCreateForm();
  } else {
    $('#create_form input').blur();
  }
});
Mousetrap.bind('ctrl+x', function() {
  TreeView.removeFocused();
});
Mousetrap.bind('ctrl+s', function() {
  $('#focus-edit-text').focus();
});
Mousetrap.bind('enter', function() {
  tree = Tree.focused();
  tree.toggleFold();
});
