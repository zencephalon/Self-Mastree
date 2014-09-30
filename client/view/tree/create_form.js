Template.create_form.settings = function() {
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
};

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
