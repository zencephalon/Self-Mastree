if (Meteor.isServer) {
  Meteor.startup(function () {
    Trees.remove({});
    if (Trees.find().count() == 0) {
      tree = Tree.create({title: "Matthew Bunday"});
      tree.create_child({title: "Strength"});
      tree.create_child({title: "Skill"});
      tree.create_child({title: "Discernment"});
    }
  });
}
