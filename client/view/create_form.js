Template.create_form.events({
  'submit': function (event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("YOLOLOL");
  }
});