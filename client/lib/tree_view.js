TreeView = {
  removeFocused: function() {
    nearest = TreeView.find.nearest();
    Tree.focused().archive();
    TreeView.focus.byId(nearest);
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.focused > ul')[0]);
    $('input[name="tree_title"]').focus();
  },
  insertRenameForm: function() {
    $('#focus-title').html("");
    Blaze.render(Template.rename_form, $('#focus-title')[0]);
    $('#rename-form > input').focus();
  },
  find: {
    nextSibling: function(id) {
      $ele = $('.focused').next('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    prevSibling: function(id) {
      $ele = $('.focused').prev('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    firstSibling: function(id) {
      $ele = $('.focused').parent().children().first();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    lastSibling: function(id) {
      $ele = $('.focused').parent().children().last();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    parent: function(id) {
      $ele = $('.focused').parent().parent('div');
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    firstChild: function(id) {
      $ele = $('.focused').children('ul').children().first();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    nearest: function() {
      $next = TreeView.find.nextSibling();
      if ($next.length > 0 && !$next.hasClass('focused')) {
        return $next.data('id');
      } else {
        $prev = TreeView.find.prevSibling();
        if ($prev.length > 0 && !$prev.hasClass('focused')) {
          return $prev.data('id');
        } else {
          return TreeView.find.parent(true);
        }
      }
    }
  },
  focus: {
    byId: function(id) {
      var tree = Tree.findOne(id);
      tree.focus();
    },
    nextSibling: function() {
      $next = TreeView.find.nextSibling(true);
      $first = TreeView.find.firstSibling();

      if ($next === undefined && ($first.data('id') === undefined || $first.hasClass("focused"))) {
        TreeView.focus.byId(TreeView.find.firstChild(true));
      } else if ($next !== undefined) {
        TreeView.focus.byId($next);
      } else {
        TreeView.focus.byId($first.data('id'));
      }
    },
    prevSibling: function() {
      $prev = TreeView.find.prevSibling(true);
      $last = TreeView.find.lastSibling();

      if ($prev === undefined && ($last.data('id') === undefined || $last.hasClass("focused"))) {
        TreeView.focus.byId(TreeView.find.parent(true));
      } else if ($prev !== undefined) {
        TreeView.focus.byId($prev);
      } else {
        TreeView.focus.byId($last.data('id'));
      }
    },
    parent: function() {
      $parent = TreeView.find.parent(true);
      if ($parent !== undefined) {
        TreeView.focus.byId($parent);
      }
    },
    children: function() {
      $child = TreeView.find.firstChild(true);
      if ($child !== undefined) {
        TreeView.focus.byId($child);
      }
    }
  },
}

//Tracker.autorun(function() {
//  if (Session.get("focused_tree") !== undefined) {
//    TreeView.focus.byId(Session.get("focused_tree"));
//  }
//});
