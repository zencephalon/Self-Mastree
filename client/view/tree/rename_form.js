Template.rename_form.events({
  'submit': function() {
    tree = Tree.findOne(Session.get("selected_tree"));
    tree.update({"$set": {title: $('#rename-form > input').val()}});
    $('#rename-form').remove();
    return false;
  }
})
