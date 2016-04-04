// require express and other modules
var express = require('express'),
    app = express();


// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/AdrianaVillagran/express_self_api/README.md", // CHANGE ME
    base_url: "http://strawberry-pudding-29695.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "A snippet of data about me"},
      {method: "GET", path: "/api/artworks", description: "Database of a few recent art pieces I have made"},
      {method: "GET", path: "/api/artworks/:id", description: "Displays a specific piece of artwork"},
      {method: "POST", path: "/api/artworks", description: "Creates an additional piece of artwork in the art database"},
      {method: "PUT", path: "/api/artworks/:id", description: "Updates the parameters of a specific piece of art in the database"},
      {method: "DELETE", path: "/api/artworks/:id", description: "Deletes an artwork"},
    ]
  });
});

/**********
 * SERVER *
 **********/

app.get('/api/profile', function(req, res) {
  db.Profile.find(function (err, profiles) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(profiles);
  });
});

app.get('/api/artworks', function(req, res) {
  db.Artwork.find(function (err, artworks) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(artworks);
  });
});

app.get('/api/artworks/:id', function(req, res) {
  var artworkId = req.params.id;
  db.Artwork.findById(artworkId, function(err, foundArtwork) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(foundArtwork);
  });
});

app.post('/api/artworks', function(req, res) {
  var newArtwork = new db.Artwork({
    title: req.body.title,
    medium: req.body.medium,
    image: req.body.image,
    dimensions: req.body.dimensions,
    year: req.body.year,
    status:req.body.status
  });

  newArtwork.save(function (err, savedArtwork) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(savedArtwork);
  });
});

app.delete('/api/artworks/:id', function(req, res) {
  var artworkId = req.params.id;
  db.Artwork.findOneAndRemove({_id:artworkId}, function(err, deletedArtwork) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(deletedArtwork);
  });
});

app.put('/api/artworks/:id', function(req, res) {
  var artworkId = req.params.id;
  db.Artwork.findById(artworkId, function(err, foundArtwork) {
    if(err) {
      console.log(err);
    }
    foundArtwork.title = req.body.title;
    foundArtwork.medium = req.body.medium;
    foundArtwork.description = req.body.dimensions;
    foundArtwork.image = req.body.image;
    foundArtwork.size = req.body.year;
    foundArtwork.status = req.body.status;

    foundArtwork.save(function (err, updatedArtwork) {
      res.status(200).json(updatedArtwork);
    });
  });
});


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
