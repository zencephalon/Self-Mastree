TreeView = {
  removeSelected: function() {
    nearest = TreeView.find.nearest();
    Tree.findOne(Session.get("selected_tree")).remove();
    TreeView.select.byId(nearest);
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.selected > ul')[0]);
    $('input[name="tree_title"]').focus();
  },
  find: {
    nextSibling: function(id) {
      $ele = $('.selected').next('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    prevSibling: function(id) {
      $ele = $('.selected').prev('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    firstSibling: function(id) {
      $ele = $('.selected').parent().children().first();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    lastSibling: function(id) {
      $ele = $('.selected').parent().children().last();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    parent: function(id) {
      $ele = $('.selected').parent().parent('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    firstChild: function(id) {
      $ele = $('.selected').children('ul').children().first();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    nearest: function() {
      $next = TreeView.find.nextSibling();
      if ($next.length > 0 && !$next.hasClass('selected')) {
        return $next.data('id');
      } else {
        $prev = TreeView.find.prevSibling();
        if ($prev.length > 0 && !$prev.hasClass('selected')) {
          return $prev.data('id');
        } else {
          return TreeView.find.parent(true);
        }
      }
    }
  },
  select: {
    byId: function(id) {
      Session.set("selected_tree", id)
      $('.selected').removeClass('selected');
      $('div[data-id=' + id + ']').addClass('selected');
    },
    nextSibling: function() {
      $next = TreeView.find.nextSibling(true);
      $first = TreeView.find.firstSibling(true);

      if ($next === undefined && ($first === undefined || $first === Session.get("selected_tree"))) {
        TreeView.select.byId(TreeView.find.firstChild(true));
      } else if ($next !== undefined) {
        TreeView.select.byId($next);
      } else {
        TreeView.select.byId($first);
      }
    },
    prevSibling: function() {
      $prev = TreeView.find.prevSibling(true);
      $last = TreeView.find.lastSibling(true);

      if ($prev === undefined && ($last === undefined || $last === Session.get("selected_tree"))) {
        TreeView.select.byId(TreeView.find.parent(true));
      } else if ($prev !== undefined) {
        TreeView.select.byId($prev);
      } else {
        TreeView.select.byId($last);
      }
    },
    parent: function() {
      $parent = TreeView.find.parent(true);
      if ($parent !== undefined) {
        TreeView.select.byId($parent);
      }
    },
    children: function() {
      $child = TreeView.find.firstChild(true);
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
