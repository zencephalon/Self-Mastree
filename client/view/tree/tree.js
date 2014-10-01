Template.tree.events({
  'click': function (event) {
    event.stopPropagation();
    TreeView.focus.byId(this._id);
  }
});

Template.tree.today_count = function(tree) {
  count = Template.tree.day_count(tree, new Date());
  if (count != 0) {
    return "<span class='green'>+" + count + "</span>";
  } else {
    return "+0"
  }
}

Template.tree.total_yesterday_today = function(tree) {
  yesterday_count = Template.tree.yesterday_count(tree);
  return (tree.total_count - yesterday_count) + "+" + yesterday_count;
}

Template.tree.yesterday_count = function(tree) {
  date = new Date();
  date.setDate(date.getDate() - 1);
  count = Template.tree.day_count(tree, date);
  return count;
}

Template.tree.day_count = function(tree, date) {
  year = date.getFullYear();
  month = date.getMonth();
  month_day = date.getDate();
  week_day = date.getDay();
  try {
    return tree['date'][year][month][month_day][week_day]['count'];
  } catch(e) {
    return 0
  }
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
