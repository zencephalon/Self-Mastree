Template.tree.events({
  'click': function (event) {
    event.stopPropagation();
    TreeView.focus.byId(this._id);
  }
});

Template.tree.today_count = function(tree) {
  count = tree.day_count(new Date());
  if (count != 0) {
    return "<span class='green'>+" + count + "</span>";
  } else {
    return "+0"
  }
}

Template.tree.avg_display = function(tree) {
  today_count = tree.day_count(new Date());
  avg = tree.average()
  if (today_count > avg) {
    return "<span class='green'>" + avg + '</span>';
  } else {
    return avg;
  }
}

Template.tree.total_yesterday_today = function(tree) {
  yesterday_count = Template.tree.yesterday_count(tree);
  today_count = tree.day_count(new Date());

  if (today_count > yesterday_count) {
    start_str = "<span class='green'>(</span>";
    end_str = ")</span>";
  } else {
    start_str = "(";
    end_str = "</span>)";
  }
  return start_str + yesterday_count + "<span class='green'>+" + today_count + end_str;
}

Template.tree.yesterday_count = function(tree) {
  date = new Date();
  date.setDate(date.getDate() - 1);
  count = tree.day_count(date);
  return count;
}

Template.tree.folded_class = function (tree) {
  if (tree.folded) {
    return "folded";
  } else {
    return false;
  }
}

Template.tree.focused_class = function (tree) {
  c = "tree";
  if (tree.focused) {
    c += " focused";
  }
  return c;
}
