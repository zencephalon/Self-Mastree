Template.rename_form.events({
  'submit': function() {
    tree = Tree.focused();
    tree.update({"$set": {title: $('#rename-form > input').val()}});
    $('#rename-form').remove();
    return false;
  }
})
