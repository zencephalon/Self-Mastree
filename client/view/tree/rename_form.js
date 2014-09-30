Template.rename_form.settings = function() {
  return {
    position: "bottom",
    limit: 5,
    rules: [{
      token: '@',
      replacement: '@(',
      end_token: ') ',
      collection: Trees,
      filter: {archived: {"$ne": true}},
      field: "ref",
      template: Template.qs_tree_display,
      callback: function(doc, element) {
      }
    }]
  }
}

Template.rename_form.initial_value = function () {
  tree = Tree.focused();
  return tree.text;
}

Template.rename_form.events({
  'submit': function(event) {
    tree = Tree.focused();
    // TODO: refactor to use event.target
    tree.updateText($('#rename-form > input').val(), true);
    $('#rename-form').remove();
    return false;
  }
})
