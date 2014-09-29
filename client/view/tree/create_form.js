Template.create_form.events({
  'submit': function (event) {
    event.preventDefault();
    event.stopPropagation();
    parent = Tree.focused();
    $input = $('input[name="tree_title"]');
    parent.createChild({title: $input.val() });
    $('#create_form').remove();
  }
});
