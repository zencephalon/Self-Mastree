Template.rename_form.settings = function() {
  return {
    position: "bottom",
    limit: 5,
    rules: [{
      token: '@',
      replacement: '@',
      end_token: ' ',
      collection: Trees,
      filter: {attr: {"$exists": true}},
      field: "attr",
      template: Template.qs_tree_display,
      callback: function(doc, element) {
      }
    }, {
      token: '#',
      replacement: '#',
      end_token: ' ',
      collection: Trees,
      filter: {hash: {"$exists": true}},
      field: "hash",
      template: Template.qs_tree_display,
      callback: function(doc, element) {}
    }]
  }
}

Template.rename_form.initial_value = function () {
  tree = Tree.focused();
  return tree.title;
}

Template.rename_form.events({
  'submit': function() {
    tree = Tree.focused();
    tree.update({"$set": {title: $('#rename-form > input').val()}});
    $('#rename-form').remove();
    return false;
  }
})
