Template.node.events({
  'click': function (event) {
    event.stopPropagation();
    this.incCount(true);
    ViewNode.select.byId(this._id);
  }
});
