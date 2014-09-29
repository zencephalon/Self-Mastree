Template.focus.title = function () {
  tree = Tree.findOne(Session.get("selected_tree"));
  return tree.title;
}
