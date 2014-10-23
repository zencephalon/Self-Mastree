Template.quickswitcher.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [{
        token: ':',
        replacement: '',
        end_token: '',
        collection: Trees,
        field: "ref",
        matchAll: true,
        filter: {archived: {"$ne": true}},
        template: Template.qs_tree_display,
        callback: function(doc, element) {
          var tree = Tree.findOne(doc._id);
          TreeView.focus.byId(tree._id);
          tree.unfoldUp(true);
          $('#quickswitcher').hide();
        }
      }]
    }
  }
});

Template.quickswitcher.rendered = function() {
  Mousetrap.bind('ctrl+space', function(e) {
    e.preventDefault();
    $('#quickswitcher').show();

    $('#switcher').focus().val(":");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
  });
  $(document).ready(function() {
    $('#quickswitcher').focusout(function() {
      $('#quickswitcher').hide();
    })
  });
}
