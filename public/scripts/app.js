console.log("Sanity Check: JS is working!");
var template;
var $artworkList;
var allArtworks = [];
var profileTemplate;
var $myProfile;
var myProfile;
var profile;


$(document).ready(function(){

  $artworkList = $('#artworkEntry');
  var source = $('#artwork-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/artworks',
    success: onSuccess,
    error: onError
  });

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: profileSuccess,
    error: profileError
  });

});

function renderArtwork() {

  // pass myProfile into the template function
  var artworkHtml = template({artworks: allArtworks});

  // append html to the view
  $artworkList.append(artworkHtml);
}

function onSuccess(json) {
  console.log(json);
  allArtworks = json;
  renderArtwork();
}

function onError(err) {
  console.log(err);
}


function renderProfile() {
  // append html to the view
  $('#github-image').html('<img src="' + myProfile[0].github_profile_image + '" height="100" style="border-radius:150px" class="img-responsive">');
  $("#my-name").append(myProfile[0].name);
  $('#github-link').html('<a href="' + myProfile[0].github_link + '">Github Link</a>');
  $('#current-city').append(myProfile[0].current_city);
  $('#pets').text('Pets: ' + myProfile[0].pets[0].name + ' the ' + myProfile[0].pets[0].breed);
}


function profileSuccess(json) {
  console.log(json);
  myProfile = json;
  renderProfile();
}

function profileError(err) {
  console.log(err);
}



function profileError(err) {
  console.log(err);
}
