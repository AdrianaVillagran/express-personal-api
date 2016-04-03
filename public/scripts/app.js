console.log("Sanity Check: JS is working!");
var template;
var $artworkList;
var allArtworks = [];


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


});


function renderArtwork() {

  // pass myProfile into the template function
  var artworkHtml = template({artworks: allArtworks});
  console.log({artworks: allArtworks});

  // append html to the view
  $artworkList.append(artworkHtml);
  console.log(artworkHtml);
}

function onSuccess(json) {
  console.log(json);
  allArtworks = json;
  renderArtwork();
}

function onError(err) {
  console.log(err);
}
