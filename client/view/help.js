Template.help.help = function() {
  if (Meteor.user()) {
    return Meteor.user().profile.show_help;
  }
}
