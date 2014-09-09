Template.root.root = function() {
  return Tree.findOne({root: true});
}

Template.root.events({
  'click': function () {
    this.incCount(true);
  }
});