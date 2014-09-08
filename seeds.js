if (Meteor.isServer) {
  Meteor.startup(function () {
    Trees.remove({});
    if (Trees.find().count() == 0) {
      tree = Tree.create({title: "Matthew Bunday", root: true});
      str_tree = tree.create_child({title: "Strength"});
      str_tree.create_child({title: "Taijutsu"});
      str_tree.create_child({title: "Bodyweight"});
      tree.create_child({title: "Skill"});
      tree.create_child({title: "Discernment"});
    }
  });
}
