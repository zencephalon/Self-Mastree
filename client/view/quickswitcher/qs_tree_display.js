Template.qs_tree_display.helpers({
  parent_ref: function (tree) {
    parent = Tree.findOne(tree.parent);
    return parent.ref;
  }
});
