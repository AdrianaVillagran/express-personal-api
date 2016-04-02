// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var myProfile = [{
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
              }];

var artwork_list = [
   {
     title: "Sweet Tooth",
     medium: "Oil on panel",
     description: "A surrealistic self-portrait",
     image: "http://www.adrianavillagran.com/uploads/1/5/4/4/15449028/381502.jpg?623",
     size: "16 x 20 inches",
     year: 2014,
     status: "Sold"
   },
   {
     title: "Sticky Bun",
     medium: "Oil on panel",
     description: "A representational prograit of an anonymons blonde woman with lollipops woven in her hair.",
     image: "http://www.adrianavillagran.com/uploads/1/5/4/4/15449028/3328036.jpg?585",
     size: "16 x 20 inches",
     year: 2015,
     status: "Available"
   },
   {
     title: "Shroud",
     medium: "Colored pencil on paper",
     description: "A portrait of a woman shrouded in pink and blue tulle.",
     image: "http://www.adrianavillagran.com/uploads/1/5/4/4/15449028/3988403.jpg?638",
     size: "11 x 14 inches",
     year: 2015,
     status: "Sold"
   },
   {
     title: "Under the Rose",
     medium: "Colored pencil on paper",
     description: "A portrait of a female figure putting a wreath of pink roses over her eyes",
     image: "http://www.adrianavillagran.com/uploads/1/5/4/4/15449028/1167715.jpg?576",
     size: "12 x 16 inches",
     year: 2015,
     status: "Available"
   }
];

db.Profile.remove({}, function(err, profile){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all profiles');

    // create new records based on myProfile
    db.Profile.create(myProfile, function(err, profile){
      if (err) { return console.log('err', err); }
      console.log("Created new profile ", profile._id);
    });

    db.Artwork.remove({}, function(err, artworks){
      if(err) {
        console.log('Error occurred in remove', err);
      } else {
        console.log('removed all pieces');

        // create new records based on the array artwork_list
        db.Artwork.create(artwork_list, function(err, artworks){
          if (err){
            return console.log("Error:", err);
          }
          console.log("Created", artworks.length, "new pieces");
          process.exit(); // we're all done! Exit the program.
        });
      }
    });

  }
});
