ViewNode = {
  removeSelected: function() {
    Tree.findOne(Session.get("selected_node")).remove();
  },
  insertCreateForm: function() {
    Blaze.render(Template.create_form, $('.selected > ul')[0]);
    $('input[name="node_title"]').focus();
  },
  select: function(id) {
    Session.set("selected_node", id)
    $('.selected').removeClass('selected');
    $('div[data-id=' + id + ']').addClass('selected');
  },
  findNextSibling: function() {
    return $('.selected').next('div');
  },
  selectNextSibling: function() {
    $next = findNextSibling();
    if ($next.attr('data-id') !== undefined) {
      ViewNode.select($next.attr('data-id'));
    } else {
      ViewNode.select($('.selected').parent().children().first().attr('data-id'));
    }
  },
  selectPrevSibling: function() {
    $prev = $('.selected').prev('div');
    if ($prev.attr('data-id') !== undefined) {
      ViewNode.select($prev.attr('data-id'));
    } else {
      ViewNode.select($('.selected').parent().children().last().attr('data-id'));
    }
  },
  selectParent: function() {
    $parent = $('.selected').parent().parent('div');
    if ($parent.attr('data-id') !== undefined) {
      ViewNode.select($parent.attr('data-id'));
    }
  },
  selectChildren: function() {
    $child = $('.selected').children('ul').children().first();
    if ($child.attr('data-id') !== undefined) {
      ViewNode.select($child.attr('data-id'));
    }
  }
}

Tracker.autorun(function() {
  if (Session.get("selected_node") !== undefined) {
    ViewNode.select(Session.get("selected_node"));
  }
});