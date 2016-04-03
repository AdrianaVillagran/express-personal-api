console.log("Sanity Check: JS is working!");
var template;
var allArtworks = [];
var $artworkList;
var myProfile;
var profile;


$(document).ready(function(){

 $artworkList = $('#artworkEntry');
  // form to create new todo
  var $newArtwork = $('#newArtworkForm');

  //compile handlebars template
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

  $newArtwork.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/artworks',
      data: $(this).serialize(),
      success: newArtworkSuccess,
      error: newArtworkError
    });

    //resets form
    $newArtwork[0].reset();

  });


});
//function to render artwork to view
function renderArtwork() {
  //empties existing artwtork from view
  console.log('hi');
  $artworkList.empty();

  // pass myProfile into the template function
  var artworkHtml = template({artworks: allArtworks});

  // append html to the view
  $artworkList.append(artworkHtml);
}


function onSuccess(json) {
  allArtworks = json;
  renderArtwork();
}

function onError(err) {
  console.log(err);
}


function renderProfile() {
  // append html to the view
  $('#github-image').html('<img src="' + myProfile[0].github_profile_image + '" height="140" class="img-circle img-responsive">');
  $("#my-name").append(myProfile[0].name);
  $('#github-link').html('<a href="' + myProfile[0].github_link + '">Github Link</a>');
  $('#current-city').append(myProfile[0].current_city);
  $('#pets').text('Pets: ' + myProfile[0].pets[0].name + ' the ' + myProfile[0].pets[0].breed);
}


function profileSuccess(json) {
  myProfile = json;
  renderProfile();
}

function profileError(err) {
  console.log(err);
}



function profileError(err) {
  console.log(err);
}

function newArtworkSuccess(json) {
  console.log(json);
  allArtworks.push(json);
  renderArtwork();
}

function newArtworkError(err) {
  console.log(err);
}
