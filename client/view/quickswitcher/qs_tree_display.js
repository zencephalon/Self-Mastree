Template.qs_tree_display.parent_title = function (tree) {
  parent = Tree.findOne(tree.parent);
  console.log(tree);
  console.log(parent);
  return parent.title;
}
