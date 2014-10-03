TreeView = {
  removeFocused: function() {
    nearest = TreeView.find.nearest();
    Tree.focused().archive();
    TreeView.focus.byId(nearest);
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.focused > ul')[0]);
    $('input[name="tree_text"]').focus();
  },
  insertRenameForm: function() {
    $('#focus-text').html("");
    Blaze.render(Template.rename_form, $('#focus-text')[0]);
    $('#rename-form > input').focus();
  },
  updateChildrenFromDOM: function() {
    parent = TreeView.find.parent();
    tree = Tree.findOne(parent.data('id'));
    children = _.map(parent.find('ul').eq(0).children('div'), function(tree) { return tree.getAttribute('data-id') });
    tree.update({"$set":{children: children}});
  },
  move: {
    nextSibling: function() {
      $next = TreeView.find.nextSibling();
      $first = TreeView.find.firstSibling();

      if ($next.data('id')) {
        $next.after($('.focused'));
      } else {
        $('.focused').parent().prepend($('.focused'));
      }
      TreeView.updateChildrenFromDOM();
    },
    prevSibling: function() {
      $prev = TreeView.find.prevSibling();
      $last = TreeView.find.lastSibling();

      if ($prev.data('id')) {
        $prev.before($('.focused'));
      } else {
        $('.focused').parent().append($('.focused'));
      }
      TreeView.updateChildrenFromDOM();
    }
  },
  find: {
    generic: function(id, f) {
      $ele = f();
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
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
      Tree.findOne(id).focus();
      setTimeout(function() {$('#rename-form').find('input').change();}, 50);
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
      prev = TreeView.find.prevSibling(true);
      $last = TreeView.find.lastSibling();

      if (prev === undefined && ($last.data('id') === undefined || $last.hasClass("focused"))) {
        if (parent = TreeView.find.parent(true)) {
          TreeView.focus.byId(parent);
        }
      } else if (prev) {
        TreeView.focus.byId(prev);
      } else {
        TreeView.focus.byId($last.data('id'));
      }
    },
    parent: function() {
      $parent = TreeView.find.parent(true);
      if ($parent) {
        TreeView.focus.byId($parent);
      }
    },
    children: function() {
      $child = TreeView.find.firstChild(true);
      if ($child) {
        TreeView.focus.byId($child);
      }
    }
  },
}
