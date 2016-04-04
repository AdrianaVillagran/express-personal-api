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

  $artworkList.on('click', '.delete-artwork', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/artworks/' + $(this).attr('data-id'),
      success: deleteArtworkSuccess,
      error: deleteArtworkError
    });
  });

  // for update: submit event on artwork update form
    $artworkList.on('submit', '.update-artwork', function (event) {
      event.preventDefault();
      console.log('the click is working');

      // find the todo's id (stored in HTML as `data-id`)
      var artworkId = $(this).closest('.artwork').attr('data-id');

      //find artwork by its id
      var artworkToUpdate;
      for(var i = 0; i < allArtworks.length; i++) {
        if(allArtworks[i]._id === artworkId) {
          artworkToUpdate = allArtworks[i];
          break;
        }
      }

      // serialze form data
      var updatedArtwork = $(this).serialize();
      console.log(updatedArtwork);

      // PUT request to update artwork in database
      $.ajax({
        type: 'PUT',
        url: '/api/artworks/' + artworkId,
        data: updatedArtwork,
        success:function onUpdateSuccess(json) {
          // replace artwork to update with newly updated version
          allArtworks.splice(allArtworks.indexOf(artworkToUpdate), 1, json);
          console.log('artwork was successfully updated');
          // render all artworks to view
          renderArtwork();
        },
        error: onUpdateError
      });
    });


});
/*END OF DOCUMENT READY*/


//function to render artwork to view
function renderArtwork() {
  //empties existing artwork from view
  $artworkList.empty();

  // passes artwork data into the template function
  var artworkHtml = template({artworks: allArtworks});

  // append html to the view
  $artworkList.append(artworkHtml);
}

//renders index artwork to view on page load
function onSuccess(json) {
  allArtworks = json;
  renderArtwork();
}


function onError(err) {
  console.log(err);
}

// renders profile info to view on page load
function renderProfile() {
  // append html to the view
  $('#github-image').html('<img src="' + myProfile[0].github_profile_image + '" height="150" style="display: inline-block" class="img-circle img-responsive">');
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

function newArtworkSuccess(json) {
  console.log(json);
  allArtworks.push(json);
  renderArtwork();
}

function newArtworkError(err) {
  console.log(err);
}

function deleteArtworkSuccess(json) {
  var artwork = json;
  var artworkId = artwork._id;
  // find the artwork with the correct ID and remove it from allArtworks array
  for(var i = 0; i < allArtworks.length; i++) {
    if(allArtworks[i]._id === artworkId) {
      allArtworks.splice(i, 1);
      break;
    }
  }
  renderArtwork();
}

function deleteArtworkError(err) {
  console.log(err);
}



function onUpdateError(err) {
  console.log(err);
}
