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
    $artworkList.on('click', '.update-artwork', function (event) {
      console.log('the click is working');

      // // find the todo's id (stored in HTML as `data-id`)
      // var artworkId = $(this).closest('.artwork').attr('data-id');
      // console.log(artworkId);
      //
      // // find the todo to update by its id
      // var todoToUpdate = allTodos.filter(function (todo) {
      //   return todo._id == todoId;
      // })[0];
      //
      // // serialze form data
      // var updatedTodo = $(this).serialize();
      //
      // // PUT request to update todo
      // $.ajax({
      //   type: 'PUT',
      //   url: baseUrl + '/' + todoId,
      //   data: updatedTodo,
      //   success: function onUpdateSuccess(json) {
      //     // replace todo to update with newly updated version (json)
      //     allTodos.splice(allTodos.indexOf(todoToUpdate), 1, json);
      //
      //     // render all todos to view
      //     render();
      //   }
      // });
    });


});
//function to render artwork to view
function renderArtwork() {
  //empties existing artwtork from view
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

function deleteArtworkSuccess(json) {
  var artwork = json;
  var artworkId = artwork._id;
  // find the artwork with the correct ID and remove it from our allBooks array
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
