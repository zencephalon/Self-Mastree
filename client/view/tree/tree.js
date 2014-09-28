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
    return tree['date'][year][month][month_day][week_day]['count'];
  } catch(e) {
    return 0;
  }
}
