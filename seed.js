var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Restaurants = require('./db/models/restaurant.js');

var uri = 'mongodb://127.0.0.1/wegot'
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('Connected to DB!');
})

var seedDb = function(data) {
  console.log('seeding data');
  //add data from seed_data.js
  // console.log(data);
  //loop through data and save each to db
  console.log('entries count: ' + data.length);

  data.forEach((restaurant) => {
    var result = restaurant.result;
    var restaurant = {
      name: result.name,
      place_id: result.place_id,
      google_rating: result.rating,
      zagat_food_rating: result.zagat_food,
      review_count: result.reviews.length,
      
      short_description: result.short_description,
      neighborhood: result.address_components[2]["long_name"],
      location: { lat: result.geometry.location.lat, long: result.geometry.location.long },
      address: result.formatted_address, 
      website: result.website,
      price_level: result.price_level,
      types: result.types
    }
    console.log(restaurant);
    Restaurants.insertOne(restaurant, (err, story) => {
      if(err){
        console.log(err);
      } else{
        console.log('saving');
      }
    })
  });

};

seedDb(data);
