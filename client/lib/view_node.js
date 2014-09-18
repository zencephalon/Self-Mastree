ViewNode = {
  removeSelected: function() {
    Tree.findOne(Session.get("selected_node")).remove();
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.selected > ul')[0]);
    $('input[name="node_title"]').focus();
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
      Session.set("selected_node", id)
      $('.selected').removeClass('selected');
      $('div[data-id=' + id + ']').addClass('selected');
    },
    nextSibling: function() {
      $next = ViewNode.find.nextSibling();
      if ($next !== undefined) {
        ViewNode.select.byId($next);
      } else {
        ViewNode.select.byId(ViewNode.find.firstSibling());
      }
    },
    prevSibling: function() {
      $prev = ViewNode.find.prevSibling();
      if ($prev !== undefined) {
        ViewNode.select.byId($prev);
      } else {
        ViewNode.select.byId(ViewNode.find.lastSibling());
      }
    },
    parent: function() {
      $parent = ViewNode.find.parent();
      if ($parent !== undefined) {
        ViewNode.select.byId($parent);
      }
    },
    children: function() {
      $child = ViewNode.find.firstChild();
      if ($child !== undefined) {
        ViewNode.select.byId($child);
      }
    }
  },
}

Tracker.autorun(function() {
  if (Session.get("selected_node") !== undefined) {
    ViewNode.select.byId(Session.get("selected_node"));
  }
});