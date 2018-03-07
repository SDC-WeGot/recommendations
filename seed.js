// var restData = require('./seed_data.js');
var restData = require('./allData.js');
var mongoose = require('mongoose');
var Restaurants = require('./db/models/restaurant.js');
var api_key = require('./config.js');
const axios = require('axios');
const request = require ('request-promise');

var uri = 'mongodb://127.0.0.1/wegot'
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to DB!');
});

var googlePhotoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

//try catch with first request
//for loop through each response and
  //do another try catch to fetch nearby
  //and second try catch to fetch photo url
  //then another try catch save to db

async function getRestaurants(restData) {
  var response;
  var photosURLArray = [];

  for(var i = 0; i < restData.length; i++){
    var photoRes;
    var rest = restData[i];
    var result = restData[i].result;
    console.log("Number of photos: ", result.photos.length);
    var photosURLArray = [];
    var photos = result.photos;

    //loop through photoRef array
    for(var j = 0; j < photos.length; j++){
      var photoRefId = photos[j].photo_reference;
      // console.log(photoRefId);
      var photoOptions = {
          url: googlePhotoURL,
          qs: {
            'key': api_key.KEY,
            'photoreference': photoRefId
          },
          json: true,
          headers: {
            'content-type': 'application/json',
          },
      }
      var photoURL;
      try {
        photoRes = await request(photoOptions, (err, res, body) => (
            photoUrl = res.request.href
          )
        )
      } catch(err){
        console.log(err);
      }
      // console.log(photoUrl);
      photosURLArray.push(photoUrl);

    }

    console.log("number of photos:" + photosURLArray.length);

    //convert types
    var typesArray = [];
    var originalTypes = result.types;
    // console.log(originalTypes.length);
    originalTypes.forEach((type) => {
      typesArray.push(convertString(type));
    });

    //get nearby restaurants
    var resObj = restData.slice();
    resObj.sort((r1, r2) => {
      var d1 = distance(rest, r1);
      var d2 = distance(rest, r2);
      // console.log("d1 "+ d1)
      // console.log("d2 " +d2)
      if(d1 <= d2){
        return -1;
      } else if(d1 > d2){
        return 1;
      }
    });
    var distArr = resObj.slice(1, 7).map((res) => {
      return res.result.place_id;
    })
    console.log(distArr);

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
      location: { lat: result.geometry.location.lat, long: result.geometry.location.lng },
      address: result.formatted_address, 
      website: result.website,
      price_level: result.price_level,
      types: typesArray,
      nearby: distArr
    }
    console.log(restaurant);

    //add restaurant to db
    var obj = new Restaurants.RestaurantModel(restaurant);
    try{
      await obj.save();
    } catch(err){
      console.log(err);
    }
    console.log("restaurant saved");
  }
}

getRestaurants(restData).then(()=> {
  console.log('goodbye');
  mongoose.connection.close();
});

var convertString = (str) => {
  var words = str.split('_');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
};

var distance = (r1, r2) => {
  var lat1 = r1.result.geometry.location.lat;
  var lon1 = r1.result.geometry.location.lng;
  var lat2 = r2.result.geometry.location.lat;
  var lon2 = r2.result.geometry.location.lng;
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};

