function dropData() {
  Trees.remove({});
  Meteor.users.remove({});
}

function seedData() {
  uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  tree = Tree.create({text: "Matthew Bunday", root: true, uid: uid});
  tree.createChild({text: "Nature"});
  tree.createChild({text: "Skills"});
  tree.createChild({text: "Quests"});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //dropData();
    if (Trees.find().count() == 0) {
      seedData();
    }
  });
}
