Template.node.events({
  'click': function (event) {
    event.stopPropagation();
    this.incCount(true);
    Session.set("selected_node", this._id);
  }
});
