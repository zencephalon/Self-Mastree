Template.help.helpers({
  help: function() {
    if (Meteor.user()) {
      return Meteor.user().profile.show_help;
    }
  },
  api_inc_url: function() {
    return 'http://self.zencephalon.com/t/' + Tree.focused()._id + '/inc';
  }
});

Template.help.events({
  'click a#hide-help': function() {
    Meteor.users.update({_id: Meteor.user()._id}, {"$set": {'profile.show_help': false}});
  },
  'click a#show-help': function() {
    Meteor.users.update({_id: Meteor.user()._id}, {"$set": {'profile.show_help': true}});
  }
});
