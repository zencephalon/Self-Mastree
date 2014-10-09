Template.focus.settings_maker = function(callback) {
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
      callback: callback
    }]
  }
}

Template.focus.text_callback = function(doc, element) {
  tree = Tree.focused();
  tree.addLink(doc._id);
}

Template.focus.parent_callback = function(doc, element) {
  tree = Tree.focused();
  tree.updateParent(doc._id);
}

Template.focus.text_settings = function() {
  return Template.focus.settings_maker(Template.focus.text_callback);
}

Template.focus.parent_settings = function() {
  return Template.focus.settings_maker(Template.focus.parent_callback);
}

Template.focus.initial_value = function () {
  tree = Tree.focused();
  return tree.text;
}

Template.focus.parent_value = function() {
  tree = Tree.focused();
  return "@(" + Tree.findOne(tree.parent).ref + ")";
}

Template.focus.recordStats = function() {
  tree = Tree.focused();
  stats =  tree.recordStats();
  return "<tr><td>Day Rec</td><td>" + stats.day.record + "</td></tr>" +
         "<tr><td>Day Avg</td><td>" + stats.day.avg + "</td></tr>" +
         "<tr><td>Hour Rec</td><td>" + stats.hour.record + "</td></tr>" +
         "<tr><td>Hour Avg</td><td>" + stats.hour.avg + "</td></tr>";
}

Template.focus.rendered = function() {
  $('#rename-form').find('input').autosizeInput();
  setTimeout(function() {$('#rename-form').find('input').change()}, 500);
}

Template.focus.events({
  'submit': function(event) {
    event.preventDefault();
    tree = Tree.focused();
    tree.updateText($(event.target).find('input[name=text]').val(), true);
    $(event.target).find('input').blur();
    return false;
  }
})

