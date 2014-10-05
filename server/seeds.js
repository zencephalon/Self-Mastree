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
  Accounts.onCreateUser(function(options, user) {
    tree = Tree.create({text: "User", root: true, uid: user._id, focused: true});
    tree.createChild({text: "Nature"});
    tree.createChild({text: "Skills"});
    tree.createChild({text: "Quests"});
    user['profile'] = {};
    user['profile']['show_help'] = true;
    return user;
  });

  Meteor.startup(function () {
    //Trees.update({"createdAt": {"$exists":false}}, {"$set":{createdAt: new Date()}}, {multi:true});
    Trees.update({uid: "i3RsjMfwdDEAhLR9K"}, {"$set":{createdAt: new Date(2014, 9, 1)}}, {multi:true});
    //dropData();
    if (Trees.find().count() == 0) {
      seedData();
    }

    Meteor.publish("user_trees", function() {
      return Trees.find({uid: this.userId});
    });
    Meteor.publish("tree", function(_id) {
      return Trees.find({_id: _id});
    });
  })
}
