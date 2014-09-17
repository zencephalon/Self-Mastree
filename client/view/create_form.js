Template.create_form.events({
  'submit': function (event) {
    event.preventDefault();
    event.stopPropagation();
    parent = Tree.findOne(Session.get("selected_node"));
    $input = $('input[name="node_title"]');
    parent.createChild({title: $input.val() });
    $('#create_form').remove();
  }
});