function dropData() {
  Trees.remove({});
  Meteor.users.remove({});
}

function seedData() {
  uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  tree = Tree.create({title: "Matthew Bunday", root: true, uid: uid});
  str_tree = tree.create_child({title: "Strength"});
  str_tree.create_child({title: "Taijutsu"});
  str_tree.create_child({title: "Bodyweight"});
  tree.create_child({title: "Skill"});
  tree.create_child({title: "Discernment"});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //dropData();
    if (Trees.find().count() == 0) {
      seedData();
    }
  });
}
