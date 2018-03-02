var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Restaurants = require('./db/models/restaurant.js');
var api_key = require('./config.js');
const axios = require('axios');

var uri = 'mongodb://127.0.0.1/wegot'
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to DB!');
});

var googlePhotoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

var getPhotoURLFromGoogle = (photoRefId, callback) => (
  axios({
    url: googlePhotoURL,
    method: 'GET',
    contentType: 'application/json',
    params: {
      'key': api_key.KEY,
      'photoreference': photoRefId
    }
  }).then((data)=>{
    console.log('response from google');
    var photoUrl = data.request.res.req.res.responseUrl;
    console.log(photoUrl)
    callback (photoUrl);
  }).catch((error)=>{
    console.log(error);
  })
);

var convertString = (str) => {
  var words = str.split('_');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
};

var seedDb = function(data) {
  console.log('seeding data');
  //add data from seed_data.js
  // console.log(data);
  //loop through data and save each to db
  console.log('entries count: ' + data.length);

  data.forEach((restaurant) => {
    var result = restaurant.result;

    console.log("Number of photos: ", result.photos.length);
    var photosURLArray = [];
    var photos = result.photos;
    photos.forEach((photo) => {
      // var photo = photos[0];
      var id = photo.photo_reference;
      getPhotoURLFromGoogle(id, function(url){
        console.log("Photo url from google",url);
        photosURLArray.push(url);
        if(photosURLArray.length  === photos.length) {
          console.log(photosURLArray.length + " photos added");

          //convert types to readable string
          var typesArray = [];
          var originalTypes = result.types;
          // console.log(originalTypes.length);
          originalTypes.forEach((type) => {
            typesArray.push(convertString(type));
          });

          //generate restaurant models for each restaurant
          var restaurant = {
            name: result.name,
            place_id: result.place_id,
            google_rating: result.rating,
            zagat_food_rating: result.zagat_food,
            review_count: result.reviews.length,
            photos: photosURLArray,
            short_description: result.short_description,
            neighborhood: result.address_components[2]["long_name"],
            location: { lat: result.geometry.location.lat, long: result.geometry.location.long },
            address: result.formatted_address, 
            website: result.website,
            price_level: result.price_level,
            types: typesArray
          }
          console.log(restaurant);

          //add restaurant to db
          Restaurants.insertOne(restaurant, (err, story) => {
            if(err){
              console.log(err);
            } else{
              console.log('saving');
            }
          })
        }
      })
    });
  });
};

seedDb(data);
