function dropData() {
  Trees.remove({});
  Meteor.users.remove({});
}

function seedData() {
  uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  tree = Tree.create({title: "Matthew Bunday", root: true, uid: uid});
  ninpo = tree.createChild({title: "Ninpo"});
  taijutsu = ninpo.createChild({title: "Taijutsu"});
  taijutsu.createChild({title: "Ichi Monji no Kamae"});
  tsuki = taijutsu.createChild({title: "Tsuki"});
  tsuki.createChild({title: "from Ichimonji"});
  tsuki.createChild({title: "from Shizen"});
  kenjutsu = ninpo.createChild({title: "Kenjutsu"});
  kenjutsu.createChild({title: "Koho Seigan Nuki"});
  kenjutsu.createChild({title: "Tsuki with Ken"});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //dropData();
    if (Trees.find().count() == 0) {
      seedData();
    }
  });
}
