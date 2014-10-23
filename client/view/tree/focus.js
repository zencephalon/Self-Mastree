Template.focus.helpers({
  text_settings: function() {
    return AutocompleteHelper.settings_maker(AutocompleteHelper.text_callback);
  },
  parent_settings: function() {
    return AutocompleteHelper.settings_maker(AutocompleteHelper.parent_callback);
  },
  initial_value: function () {
    tree = Tree.focused();
    return tree.text;
  },
  parent_value: function() {
    tree = Tree.focused();
    return "@(" + Tree.findOne(tree.parent).ref + ")";
  },
  root: function() {
    tree = Tree.focused();
    return tree.root;
  },
  val: function() {
    return Tree.focused().val;
  },
  recordStats: function() {
    tree = Tree.focused();
    stats =  tree.recordStats();
    return "<tr><td>Day Rec</td><td>" + stats.day.record + "</td></tr>" +
           "<tr><td>Day Avg</td><td>" + stats.day.avg + "</td></tr>" +
           "<tr><td>Hour Rec</td><td>" + stats.hour.record + "</td></tr>" +
           "<tr><td>Hour Avg</td><td>" + stats.hour.avg + "</td></tr>" +
           "<tr><td>Total</td><td>" + tree.total_count + "</td></tr>" +
           "<tr><td>Yesterday</td><td>" + tree.yesterdayCount() + "</td></tr>";
  }
});

Template.focus.rendered = function() {
  $('#rename-form').find('input').autosizeInput();
  setTimeout(function() {$('#rename-form').find('input').change()}, 500);
}

Template.focus.events({
  'submit': function(event) {
    event.preventDefault();
    tree = Tree.focused();
    tree.updateText($(event.target).find('input[name=text]').val(), true);
    tree.updateVal($(event.target).find('input[name=val]').val(), true);
    $(event.target).find('input').blur();
    return false;
  }
})

