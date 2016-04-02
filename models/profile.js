var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PetSchema = new Schema({
  name: String,
  type: String,
  breed: String,
  alive: Boolean
});

var ProfileSchema = new Schema({
  name: String,
  github_link: String,
  github_profile_image: String,
  current_city: String,
  pets: [PetSchema]
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
