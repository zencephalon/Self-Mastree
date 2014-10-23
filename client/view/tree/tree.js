Template.tree.events({
  'click': function (event) {
    event.stopPropagation();
    TreeView.focus.byId(this._id);
  }
});

Template.tree.helpers({
  avg_display: function(tree) {
    today_count = tree.dayCount(new Date());
    avg = tree.average()
    if (today_count > avg) {
      return "<span class='green'>" + avg + '</span>';
    } else {
      return avg;
    }
  },
  total_yesterday_today: function(tree) {
    yesterday_count = tree.yesterdayCount();
    today_count = tree.todayCount();

    if (today_count >= yesterday_count && today_count > 0) {
      start_str = "<span class='green'>(</span>";
      end_str = ")</span>";
    } else {
      start_str = "(";
      end_str = "</span>)";
    }
    return start_str + yesterday_count + "<span class='green'>+" + today_count + end_str;
  },
  folded_class: function(tree) {
    if (tree.folded) {
      return "folded";
    } else {
      return false;
    }
  },
  focused_class: function(tree) {
    c = "tree";
    if (tree.focused) {
      c += " focused";
    }
    return c;
  },
  val: function(tree) {
    val = tree.val;
    if (val > 1) {
      return "<span class='green'>" + val + "</span>";
    } else {
      return "<span class='grey'>" + val + "</span>";
    }
  }
});
