TreeView = {
  removeFocused: function() {
    nearest = TreeView.find.nearest();
    Tree.focused().archive();
    TreeView.focus.byId(nearest);
  },
  insertCreateForm: function() {
    $('.focused > ul').removeClass("folded");
    Blaze.render(Template.create_form, $('.focused > ul')[0]);
    $('input[name="tree_text"]').focus();
    Tree.focused().fold(false);
  },
  updateChildrenFromDOM: function() {
    parent = TreeView.find.parent();
    tree = Tree.findOne(parent.data('id'));
    children = _.map(
      parent.find('ul').eq(0).children('div'),
      function(tree) { return tree.getAttribute('data-id') }
    );
    tree.updateChildren(children);
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
    generic: function(id, $ele) {
      if (id) {
        return $ele.data('id');
      } else {
        return $ele;
      }
    },
    nextSibling: function(id) {
      return TreeView.find.generic(id, $('.focused').next('div'));
    },
    prevSibling: function(id) {
      return TreeView.find.generic(id, $('.focused').prev('div'));
    },
    firstSibling: function(id) {
      return TreeView.find.generic(id, $('.focused').parent().children().first());
    },
    lastSibling: function(id) {
      return TreeView.find.generic(id, $('.focused').parent().children().last());
    },
    parent: function(id) {
      return TreeView.find.generic(id, $('.focused').parent().parent('div'));
    },
    firstChild: function(id) {
      return TreeView.find.generic(id, $('.focused').children('ul').children().first());
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
      if (id) {
        Tree.findOne(id).focus();
        setTimeout(function() {$('#rename-form').find('input').change();}, 50);
      }
    },
    sibling: function(sibling, $end, alt) {
      if (sibling === undefined &&
          (!$end.data('id') || $end.hasClass("focused"))) {
        TreeView.focus.byId(alt);
      } else if (sibling) {
        TreeView.focus.byId(sibling);
      } else {
        TreeView.focus.byId($end.data('id'));
      }
    },
    nextSibling: function() {
      TreeView.focus.sibling(
        TreeView.find.nextSibling(true),
        TreeView.find.firstSibling(),
        TreeView.find.firstChild(true)
      );
    },
    prevSibling: function() {
      TreeView.focus.sibling(
        TreeView.find.prevSibling(true),
        TreeView.find.lastSibling(),
        TreeView.find.parent(true)
      );
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
