function dropData() {
  Trees.remove({});
  Meteor.users.remove({});
}

function seedData() {
  uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  tree = Tree.create({title: "Matthew Bunday", root: true, uid: uid});
  str_tree = tree.createChild({title: "Strength"});
  str_tree.createChild({title: "Taijutsu"});
  str_tree.createChild({title: "Bodyweight"});
  tree.createChild({title: "Skill"});
  tree.createChild({title: "Discernment"});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //dropData();
    if (Trees.find().count() == 0) {
      seedData();
    }
  });
}
