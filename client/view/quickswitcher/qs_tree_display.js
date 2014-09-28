Template.qs_tree_display.parent_title = function (tree) {
  parent = Tree.findOne(tree.parent);
  return parent.title;
}
