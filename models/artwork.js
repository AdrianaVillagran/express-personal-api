var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
  title: String,
  medium: String,
  image: String,
  dimensions: String,
  year: Number,
  status: String
});

var Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;
