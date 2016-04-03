console.log("Sanity Check: JS is working!");
var template;
var $myProfile;
var myProfile;
var profile;


$(document).ready(function(){

  $myProfile = $('#profileEntry');

  // compile handlebars template
  var source = $('#profile-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: onSuccess,
    error: onError
  });

});

function render() {

  // pass myProfile into the template function
  var profileHtml = template({profile: myProfile});
  console.log({profile: myProfile});

  // append html to the view
  $myProfile.append(profileHtml);
  console.log(profileHtml);
}

function onSuccess(json) {
  console.log(json);
  myProfile = json;
  render();
}

function onError(err) {
  console.log(err);
}
