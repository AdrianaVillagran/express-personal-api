var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
  title: String,
  medium:
          {
            type: String,
            required: true
          },
  description:
          {
            type: String,
            required: true
          },
  image: String,
  size:
        {
          type: String,
          required: true
        },
  year: Number,
  status: String
});

var Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;
