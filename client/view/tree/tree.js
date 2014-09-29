Template.tree.events({
  'click': function (event) {
    event.stopPropagation();
    //this.incCount(true);
    TreeView.select.byId(this._id);
  }
});

Template.tree.today_count = function(tree) {
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  month_day = date.getDate();
  week_day = date.getDay();
  try {
    return "<span class='green'>+" + tree['date'][year][month][month_day][week_day]['count'] + "</span>";
  } catch(e) {
    return "+0"
  }
}

Template.tree.folded_class = function (tree) {
  if (tree.folded) {
    return "folded";
  } else {
    return false;
  }
}
