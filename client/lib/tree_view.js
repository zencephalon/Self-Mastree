TreeView = {
  removeSelected: function() {
    Tree.findOne(Session.get("selected_tree")).remove();
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.selected > ul')[0]);
    $('input[name="tree_title"]').focus();
  },
  find: {
    nextSibling: function() {
      return $('.selected').next('div').attr('data-id');
    },
    prevSibling: function() {
      return $('.selected').prev('div').attr('data-id');
    },
    firstSibling: function() {
      return $('.selected').parent().children().first().attr('data-id');
    },
    lastSibling: function() {
      return $('.selected').parent().children().last().attr('data-id');
    },
    parent: function() {
      return $('.selected').parent().parent('div').attr('data-id');
    },
    firstChild: function() {
      return $('.selected').children('ul').children().first().attr('data-id');
    }
  },
  select: {
    byId: function(id) {
      Session.set("selected_tree", id)
      $('.selected').removeClass('selected');
      $('div[data-id=' + id + ']').addClass('selected');
    },
    nextSibling: function() {
      $next = TreeView.find.nextSibling();
      if ($next !== undefined) {
        TreeView.select.byId($next);
      } else {
        TreeView.select.byId(TreeView.find.firstSibling());
      }
    },
    prevSibling: function() {
      $prev = TreeView.find.prevSibling();
      if ($prev !== undefined) {
        TreeView.select.byId($prev);
      } else {
        TreeView.select.byId(TreeView.find.lastSibling());
      }
    },
    parent: function() {
      $parent = TreeView.find.parent();
      if ($parent !== undefined) {
        TreeView.select.byId($parent);
      }
    },
    children: function() {
      $child = TreeView.find.firstChild();
      if ($child !== undefined) {
        TreeView.select.byId($child);
      }
    }
  },
}

Tracker.autorun(function() {
  if (Session.get("selected_tree") !== undefined) {
    TreeView.select.byId(Session.get("selected_tree"));
  }
});