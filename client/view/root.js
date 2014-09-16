Template.root.root = function() {
  if (Meteor.userId()) {
    return Tree.findOne({root: true, uid: Meteor.userId()});
  } else {
    return {title: "Sign in to see your Self-Mastree", total_count: 0}
  }
}

Mousetrap.bind('down', function() {
  ViewNode.selectNextSibling();
});
Mousetrap.bind('up', function() {
  ViewNode.selectPrevSibling();
});
Mousetrap.bind('left', function() {
  ViewNode.selectParent();
});
Mousetrap.bind('right', function() {
  ViewNode.selectChildren();
});

ViewNode = {
  select: function(id) {
    Session.set("selected_node", id)
    $('.selected').removeClass('selected');
    $('div[data-id=' + id + ']').addClass('selected');
  },
  selectNextSibling: function() {
    $next = $('.selected').next('div');
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
  // code to select a node div based on this reactive session attr
})