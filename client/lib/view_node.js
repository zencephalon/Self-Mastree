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
    return $('.selected').next('div').attr('data-id');
  },
  findPrevSibling: function() {
    return $('.selected').prev('div').attr('data-id');
  },
  findFirstSibling: function() {
    return $('.selected').parent().children().first().attr('data-id');
  },
  findLastSibling: function() {
    return $('.selected').parent().children().last().attr('data-id');
  },
  selectNextSibling: function() {
    $next = ViewNode.findNextSibling();
    if ($next !== undefined) {
      ViewNode.select($next);
    } else {
      ViewNode.select(ViewNode.findFirstSibling());
    }
  },
  selectPrevSibling: function() {
    $prev = ViewNode.findPrevSibling();
    if ($prev !== undefined) {
      ViewNode.select($prev);
    } else {
      ViewNode.select(ViewNode.findLastSibling());
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