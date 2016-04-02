// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var myProfile = {
                name: "Adriana Villagran",
                github_link: "https://github.com/AdrianaVillagran",
                github_profile_image: "https://avatars3.githubusercontent.com/u/17095774?v=3&s=460",
                current_city: "San Francisco",
                pets:  [
                  {
                   name: "India",
                   type: "Dog",
                   breed: "Boston Terrier",
                   alive: true
                  },
                  {
                   name: "Rascal",
                   type: "Cat",
                   breed: "Domestic Short Hair",
                   alive: false
                  }]
              };



db.Profile.create(myProfile, function(err, profile){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new profile", profile._id);
  process.exit(); // we're all done! Exit the program.
});
