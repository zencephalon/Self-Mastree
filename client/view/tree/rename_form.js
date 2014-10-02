Template.rename_form.text_settings = function() {
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
      matchAll: true,
      template: Template.qs_tree_display,
      callback: function(doc, element) {
        tree = Tree.focused();
        tree.addLink(doc._id);
      }
    }]
  }
}

Template.rename_form.parent_settings = function() {
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
      matchAll: true,
      template: Template.qs_tree_display,
      callback: function(doc, element) {
        tree = Tree.focused();
        tree.updateParent(doc._id);
      }
    }]
  }
}

Template.rename_form.initial_value = function () {
  tree = Tree.focused();
  return tree.text;
}

Template.rename_form.parent_value = function() {
  tree = Tree.focused();
  return "@(" + Tree.findOne(tree.parent).ref + ")";
}

Template.rename_form.rendered = function() {
  $('#rename-form').find('input').autosizeInput();
  setTimeout(function() {$('#rename-form').find('input').change()}, 500);
}

Template.rename_form.events({
  'submit': function(event) {
    event.preventDefault();
    tree = Tree.focused();
    tree.updateText($(event.target).find('input[name=text]').val(), true);
    $(event.target).find('input').blur();
    return false;
  }
})
