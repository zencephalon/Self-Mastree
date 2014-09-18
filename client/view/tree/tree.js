Template.node.events({
  'click': function (event) {
    event.stopPropagation();
    this.incCount(true);
    TreeView.select.byId(this._id);
  }
});
