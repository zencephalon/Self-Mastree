AutocompleteHelper = {
  settings_maker: function(callback) {
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
  },
  text_callback: function(doc, element) {
    tree = Tree.focused();
    tree.addLink(doc._id);
  },
  parent_callback: function(doc, element) {
    tree = Tree.focused();
    tree.updateParent(doc._id);
  }
}
