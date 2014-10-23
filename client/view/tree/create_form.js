Template.create_form.helpers({
  settings: function() {
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
        }
      }]
    }
  }
});

Template.create_form.events({
  'submit': function (event) {
    event.preventDefault();
    event.stopPropagation();
    parent = Tree.focused();
    $input = $('input[name="tree_text"]');
    parent.createChild({text: $input.val() });
    $('#create_form input').blur();
  },
  'blur input': function () {
    $('#create_form').remove();
  }
});
