Template.quickswitcher.settings = function() {
  return {
    position: "bottom",
    limit: 5,
    rules: [{
      token: ':',
      replacement: '',
      end_token: '',
      collection: Trees,
      field: "title",
      template: Template.qs_tree_display
    }]
  }
}

Template.quickswitcher.events({
  'submit form': function(event) { 
    event.preventDefault();
    tree = Tree.findOneByTitle($('#switcher').val());
    console.log(tree);
    TreeView.select.byId(tree._id);
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